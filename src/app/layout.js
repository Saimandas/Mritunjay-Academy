import { Toaster } from "sonner";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-background">
         <Toaster
    position="top-right"
    richColors
    closeButton
  />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}