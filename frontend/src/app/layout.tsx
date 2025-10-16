import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "E-Commerce CRUD",
  description: "Assignment 1 - CRUD REST API + UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-900 min-h-screen">
        <Navbar />
        <main className="min-h-screen">
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </main>
      </body>
    </html>
  );
}
