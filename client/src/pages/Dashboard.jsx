import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">
        Welcome, {user?.name || user?.username}
      </h1>
      <p className="text-gray-500 mb-8">Manage your property portfolio from here</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/listings/mine"
          className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
        >
          <div className="text-3xl mb-3">🏘️</div>
          <h2 className="font-semibold text-gray-900 group-hover:text-blue-600">My Listings</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage your properties</p>
        </Link>

        <Link
          to="/listings/new"
          className="bg-blue-600 text-white rounded-xl shadow-sm p-6 hover:bg-blue-700 transition-colors group"
        >
          <div className="text-3xl mb-3">➕</div>
          <h2 className="font-semibold">New Listing</h2>
          <p className="text-sm text-blue-100 mt-1">Add a property to the marketplace</p>
        </Link>

        <Link
          to="/profile"
          className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
        >
          <div className="text-3xl mb-3">👤</div>
          <h2 className="font-semibold text-gray-900 group-hover:text-blue-600">Profile Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Update your account details</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
