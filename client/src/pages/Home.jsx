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
    <div>
      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #6d28d9 100%)' }} className="py-14 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border border-indigo-300 text-xs font-semibold text-indigo-100">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          {total > 0 ? `${total} properties live` : 'New listings daily'}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
          Find Your Perfect <br />
          <span style={{ color: '#fcd34d' }}>Space</span>
        </h1>
        <p className="text-indigo-200 text-base sm:text-lg max-w-xl mx-auto">
          Browse hundreds of properties for rent and sale across the country.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          <div className="w-64 shrink-0">
            <FilterSidebar onFilter={handleFilter} />
          </div>

          <div className="flex-1">
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="skeleton h-48 w-full" />
                    <div className="p-4 space-y-2">
                      <div className="skeleton h-4 rounded-lg w-1/3" />
                      <div className="skeleton h-5 rounded-lg w-3/4" />
                      <div className="skeleton h-4 rounded-lg w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <div className="text-3xl mb-3">⚠️</div>
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={() => fetchProperties(filters)}
                  className="mt-4 text-sm font-medium text-red-500 hover:text-red-700 underline"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && properties.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 animate-float">🏠</div>
                <p className="text-lg font-semibold text-gray-700">No properties found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
              </div>
            )}

            {!loading && !error && properties.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {properties.map((p, i) => (
                  <div key={p._id} style={{ animationDelay: `${i * 60}ms` }}>
                    <PropertyCard property={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
