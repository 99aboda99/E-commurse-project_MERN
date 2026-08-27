import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const ProtectedAdminRoute = () => {
  const { isAdmin, isOwner, isAuthenticated } = useAuth();

  // Allow access if user is an admin OR an owner
  const hasAccess = isAdmin || isOwner;

  if (!hasAccess) {
    return (
      <main className="w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50/50">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Shield / Lock Icon Badge */}
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Restricted
          </h2>

          {/* Friendly Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Oops! You need administrator privileges to access the Admin Panel.
            If you have an admin account, please log in with your admin credentials.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-secondary text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 text-center active:scale-95"
            >
              Back to Home
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="w-full sm:w-auto px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all duration-200 text-center active:scale-95"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </main>
    );
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
