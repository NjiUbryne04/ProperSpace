import { useEffect, useState, useCallback } from 'react';
import { getProperties } from '../api/properties';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});

  const fetchProperties = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getProperties(params);
      setProperties(data.properties);
      setTotal(data.total);
    } catch {
      setError('Failed to load properties. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties(filters);
  }, [fetchProperties, filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Find Your Space</h1>
        <p className="text-gray-500 mt-1">
          {total > 0 ? `${total} properties available` : 'Browse properties for rent and sale'}
        </p>
      </div>
      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <FilterSidebar onFilter={handleFilter} />
        </div>
        <div className="flex-1">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
              <span className="ml-3 text-gray-500">Loading properties...</span>
            </div>
          )}
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => fetchProperties(filters)}
                className="mt-3 text-sm text-red-500 underline hover:text-red-700"
              >
                Retry
              </button>
            </div>
          )}
          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">🏠</p>
              <p className="text-lg font-medium">No properties found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
          {!loading && !error && properties.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {properties.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
