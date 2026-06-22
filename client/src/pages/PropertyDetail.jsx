import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProperty, deleteProperty } from '../api/properties';
import { useAuth } from '../context/AuthContext';

const FALLBACK = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';

const TYPE_COLORS = {
  apartment: 'bg-violet-100 text-violet-700',
  house: 'bg-emerald-100 text-emerald-700',
  villa: 'bg-amber-100 text-amber-700',
  studio: 'bg-sky-100 text-sky-700',
  office: 'bg-indigo-100 text-indigo-700',
};

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="skeleton h-72 w-full" />
          <div className="p-6 space-y-3">
            <div className="skeleton h-4 rounded-lg w-24" />
            <div className="skeleton h-7 rounded-lg w-2/3" />
            <div className="skeleton h-4 rounded-lg w-1/3" />
            <div className="skeleton h-4 rounded-lg w-full" />
            <div className="skeleton h-4 rounded-lg w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-red-600 text-lg font-medium">{error || 'Property not found'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium underline">
          Go back
        </button>
      </div>
    );
  }

  const isOwner = user && property.author?._id === user._id;
  const typeColor = TYPE_COLORS[property.propertyType?.toLowerCase()] || 'bg-indigo-100 text-indigo-700';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Hero image with gradient overlay */}
        <div className="relative">
          <img
            src={property.imageUrls?.[0] || FALLBACK}
            alt={property.title}
            className="w-full h-80 object-cover"
            onError={(e) => { e.target.src = FALLBACK; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full glass border border-white/40 flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-6">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColor} shadow-sm`}>
              {property.propertyType}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Title + Price row */}
          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">{property.title}</h1>
              <p className="text-gray-400 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.city}, {property.country}
              </p>
            </div>
            <div className="text-right bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl px-5 py-3">
              <p className="text-2xl font-extrabold gradient-text">{property.price.toLocaleString('fr-FR')} FCFA</p>
              <p className="text-xs text-gray-400">per month</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-4" />

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm">{property.description}</p>

          {/* Extra images */}
          {property.imageUrls?.length > 1 && (
            <div className="mt-6 grid grid-cols-3 gap-2">
              {property.imageUrls.slice(1).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-full h-28 object-cover rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                  onError={(e) => { e.target.src = FALLBACK; }}
                />
              ))}
            </div>
          )}

          {/* Author */}
          {property.author && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100">
                  {(property.author.name || property.author.username)?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.author.name || property.author.username}
                  </p>
                  <p className="text-xs text-gray-400">Property Owner</p>
                </div>
              </div>
            </div>
          )}

          {/* Owner actions */}
          {isOwner && (
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => navigate(`/listings/${id}/edit`)}
                className="flex-1 border-2 border-indigo-200 text-indigo-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-colors"
              >
                Edit Listing
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 border-2 border-red-200 text-red-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors"
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
