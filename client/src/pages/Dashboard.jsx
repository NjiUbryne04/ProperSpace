import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const cards = [
  {
    to: '/listings/mine',
    icon: '🏘️',
    title: 'My Listings',
    desc: 'View and manage your properties',
    gradient: 'from-indigo-50 to-violet-50',
    border: 'border-indigo-100',
    iconBg: 'bg-gradient-to-br from-indigo-100 to-violet-100',
    hoverText: 'group-hover:text-indigo-600',
  },
  {
    to: '/listings/new',
    icon: '➕',
    title: 'New Listing',
    desc: 'Add a property to the marketplace',
    gradient: 'from-indigo-600 to-violet-600',
    border: 'border-indigo-500',
    iconBg: 'bg-white/20',
    hoverText: '',
    featured: true,
  },
  {
    to: '/profile',
    icon: '👤',
    title: 'Profile Settings',
    desc: 'Update your account details',
    gradient: 'from-gray-50 to-slate-50',
    border: 'border-gray-100',
    iconBg: 'bg-gradient-to-br from-gray-100 to-slate-100',
    hoverText: 'group-hover:text-indigo-600',
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Welcome header */}
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200">
            {(user?.name || user?.username)?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || user?.username}
            </h1>
            <p className="text-sm text-gray-400">Manage your property portfolio from here</p>
          </div>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Active Listings', value: '—', icon: '📋' },
          { label: 'Total Views', value: '—', icon: '👁️' },
          { label: 'Inquiries', value: '—', icon: '💬' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className={`group rounded-2xl border p-6 transition-all card-hover animate-fade-in-up ${
              card.featured
                ? `bg-gradient-to-br ${card.gradient} ${card.border} shadow-md shadow-indigo-200`
                : `bg-gradient-to-br ${card.gradient} ${card.border} shadow-sm`
            }`}
          >
            <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
              {card.icon}
            </div>
            <h2 className={`font-semibold mb-1 ${card.featured ? 'text-white' : `text-gray-900 ${card.hoverText}`}`}>
              {card.title}
            </h2>
            <p className={`text-sm ${card.featured ? 'text-white/70' : 'text-gray-400'}`}>
              {card.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
