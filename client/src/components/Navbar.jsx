import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass border-b border-white/60 sticky top-0 z-50 shadow-sm shadow-indigo-100/40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold gradient-text">PropSpace</span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/" active={isActive('/')}>Browse</NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
              <Link
                to="/listings/new"
                className="ml-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-4 py-1.5 rounded-full shadow-sm shadow-indigo-200 hover:shadow-indigo-300 hover:opacity-90 transition-all"
              >
                + List Property
              </Link>
              <button
                onClick={handleLogout}
                className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" active={isActive('/login')}>Log in</NavLink>
              <Link
                to="/register"
                className="ml-2 text-sm font-semibold btn-primary px-4 py-1.5 rounded-full shadow-sm"
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

const NavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
      active
        ? 'text-indigo-600 bg-indigo-50'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;
