import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { username, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full h-17.5 bg-primary flex justify-between items-center flex-row z-40">
      <a href="/" className="flex items-center flex-row ml-5 gap-3">
        <img
          src="/logo.png"
          alt="Shopify Logo"
          className="w-14 h-14 object-contain"
        />
        <h1 className="text-2xl text-white font-bold hidden md:block">
          Shopify
        </h1>
      </a>

      {/* User Avatar & Dropdown */}
      {isAuthenticated ? (
        <div className="relative mr-5" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 text-white hover:bg-white/10 rounded-full transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label="User Menu"
          >
            <span className="text-center my-auto font-medium">{username}</span>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900 text-white font-bold shrink-0">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-md text-gray-800 rounded-2xl shadow-xl border border-gray-100 py-2 z-50 transition-all duration-200">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-xl mx-1 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                My Orders
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl mx-1 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 mr-5">
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-gray-800 font-medium py-1.5 px-4 rounded-full hover:scale-105 transition-all duration-200 shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Login
          </a>
          <a
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-gray-800 font-medium py-1.5 px-4 rounded-full hover:scale-105 transition-all duration-200 shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Register
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
