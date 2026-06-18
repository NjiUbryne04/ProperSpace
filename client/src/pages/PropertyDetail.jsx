import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProperty, deleteProperty } from '../api/properties';
import { useAuth } from '../context/AuthContext';

const FALLBACK = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        const { data } = await getProperty(id);
        if (!cancelled) setProperty(data.property);
      } catch {
        if (!cancelled) setError('Property not found');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this listing permanently?')) return;
    try {
      await deleteProperty(id);
      navigate('/listings/mine');
    } catch {
      alert('Failed to delete listing.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-red-600 text-lg">{error || 'Property not found'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-sm text-blue-600 underline">Go back</button>
      </div>
    );
  }

  const isOwner = user && property.author?._id === user._id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <img
          src={property.imageUrls?.[0] || FALLBACK}
          alt={property.title}
          className="w-full h-72 object-cover"
          onError={(e) => { e.target.src = FALLBACK; }}
        />
        <div className="p-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                {property.propertyType}
              </span>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">{property.title}</h1>
              <p className="text-gray-500 mt-1">
                {property.city}, {property.country}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">${property.price.toLocaleString()}</p>
              <p className="text-sm text-gray-400">/month</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">{property.description}</p>

          {property.imageUrls?.length > 1 && (
            <div className="mt-6 grid grid-cols-3 gap-2">
              {property.imageUrls.slice(1).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-full h-24 object-cover rounded-lg"
                  onError={(e) => { e.target.src = FALLBACK; }}
                />
              ))}
            </div>
          )}

          {property.author && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                {(property.author.name || property.author.username)?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {property.author.name || property.author.username}
                </p>
                <p className="text-xs text-gray-400">Owner</p>
              </div>
            </div>
          )}

          {isOwner && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate(`/listings/${id}/edit`)}
                className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Edit Listing
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 border border-red-400 text-red-500 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Delete Listing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
