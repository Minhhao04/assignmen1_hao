"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span>E-Commerce</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/" 
                  ? "bg-black text-white" 
                  : "text-gray-700 hover:text-black hover:bg-gray-100"
              }`}
            >
              Sản phẩm
            </Link>
            <Link 
              href="/products/create" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/products/create" 
                  ? "bg-black text-white" 
                  : "text-gray-700 hover:text-black hover:bg-gray-100"
              }`}
            >
              Thêm sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
