import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProperties, deleteProperty } from '../api/properties';
import PropertyCard from '../components/PropertyCard';

const MyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMine = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getMyProperties();
      setProperties(data.properties);
    } catch {
      setError('Failed to load your listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMine();
    return () => {};
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing permanently?')) return;
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert('Failed to delete listing.');
    }
  };

  const handleEdit = (id) => navigate(`/listings/${id}/edit`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-sm text-gray-500">{properties.length} properties</p>
        </div>
        <button
          onClick={() => navigate('/listings/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Add Listing
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          <span className="ml-3 text-gray-500">Loading your listings...</span>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button onClick={fetchMine} className="mt-2 text-sm text-red-500 underline">Retry</button>
        </div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🏠</p>
          <p className="text-lg font-medium">No listings yet</p>
          <p className="text-sm mt-1">Start by adding your first property</p>
        </div>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p) => (
            <PropertyCard
              key={p._id}
              property={p}
              showActions
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
