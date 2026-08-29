import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Session from "@/models/sessionModel";
import User from "@/models/userModel";

export async function getAuthenticatedUser() {
  await connectDB();

  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  const session = await Session.findOne({
    token,
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await Session.deleteOne({
      _id: session._id,
    });

    return null;
  }

  const user = await User.findById(
    session.userId
  ).select("-password");

  if (!user || !user.isActive) {
    return null;
  }

  return user;
}

export async function requireAdmin() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      ),
    };
  }

  if (user.role !== "admin" && user.role!="operator" ) {
    return {
      user: null,
      response: NextResponse.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      ),
    };
  }

  return {
    user,
    response: null,
  };
}