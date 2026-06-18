import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          PropSpace
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            Browse
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/listings/new" className="text-sm text-gray-600 hover:text-gray-900">
                + List Property
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
