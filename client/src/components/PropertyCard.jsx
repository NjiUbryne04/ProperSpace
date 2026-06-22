import { Link } from 'react-router-dom';

const FALLBACK = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80';

const TYPE_COLORS = {
  apartment: 'bg-violet-100 text-violet-700',
  house: 'bg-emerald-100 text-emerald-700',
  villa: 'bg-amber-100 text-amber-700',
  studio: 'bg-sky-100 text-sky-700',
  office: 'bg-indigo-100 text-indigo-700',
};

const PropertyCard = ({ property, onDelete, onEdit, showActions = false }) => {
  const { _id, title, city, country, price, propertyType, imageUrls, author } = property;
  const typeColor = TYPE_COLORS[propertyType?.toLowerCase()] || 'bg-indigo-100 text-indigo-700';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover shadow-sm animate-fade-in-up group">
      <div className="relative overflow-hidden">
        <img
          src={imageUrls?.[0] || FALLBACK}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = FALLBACK; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${typeColor} shadow-sm`}>
          {propertyType}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-900 line-clamp-1 flex-1 mr-2">
            <Link to={`/properties/${_id}`} className="hover:text-indigo-600 transition-colors">
              {title}
            </Link>
          </h3>
        </div>

        <p className="text-sm text-gray-400 flex items-center gap-1 mb-3">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {city}, {country}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">{price.toLocaleString('fr-FR')}</p>
            <p className="text-xs text-gray-400">FCFA / month</p>
          </div>
          {author && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                {(author.name || author.username)?.[0]?.toUpperCase()}
              </div>
              <span className="text-xs text-gray-400">{author.name || author.username}</span>
            </div>
          )}
        </div>

        {showActions && (
          <div className="flex gap-2 pt-3 mt-3 border-t border-gray-100">
            <button
              onClick={() => onEdit(_id)}
              className="flex-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 py-1.5 rounded-lg transition-colors border border-indigo-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(_id)}
              className="flex-1 text-sm font-medium text-red-500 hover:bg-red-50 py-1.5 rounded-lg transition-colors border border-red-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
