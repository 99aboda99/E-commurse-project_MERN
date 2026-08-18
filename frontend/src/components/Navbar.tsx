import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const { username, isAuthenticated } = useAuth();

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

      <div className="w-2/5 px-2 mr-5 flex justify-between items-center">
        <a
          className="text-white font-medium py-1.5 px-4 hover:bg-white hover:text-black rounded-full transition-all duration-200"
          href="/"
        >
          Home
        </a>
        <a
          className="text-white font-medium py-1.5 px-4 hover:bg-white hover:text-black rounded-full transition-all duration-200"
          href="/cart"
        >
          Cart
        </a>
      </div>

      {/* User Avatar & Dropdown */}
      {isAuthenticated ? (
        <>
          <button
            className="relative mr-5 p-1.5 text-white hover:bg-white hover:text-black rounded-full transition-all duration-200"
            ref={menuRef}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <div className="flex flex-row ">
              <div className="text-center my-auto mr-2">{username}</div>
              <button
                className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full bg-red-900 text-white font-bold shrink-0"
                aria-label="User Menu"
              >
                {username.charAt(0).toUpperCase()}
              </button>
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-md text-gray-800 rounded-2xl shadow-xl border border-gray-100 py-2 z-50 transition-all duration-200">
                <a
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-xl mx-1 transition-colors"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </a>
                <div className="my-1 border-t border-gray-100" />
                <a
                  href="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-xl mx-1 transition-colors"
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </a>
              </div>
            )}
          </button>
        </>
      ) : (
        <div>
          <a href="/login" className="bg-white font-medium mr-5 py-1.5 px-4 rounded-full hover:scale-110 transition-all duration-200">
            Login
          </a>
          <a href="/register" className="bg-white font-medium mr-5 py-1.5 px-4 rounded-full hover:scale-110 transition-all duration-200">
            Register
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
