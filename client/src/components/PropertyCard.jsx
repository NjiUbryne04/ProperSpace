import { Link } from 'react-router-dom';

const FALLBACK = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80';

const PropertyCard = ({ property, onDelete, onEdit, showActions = false }) => {
  const { _id, title, city, country, price, propertyType, imageUrls, author } = property;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={imageUrls?.[0] || FALLBACK}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.src = FALLBACK; }}
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            {propertyType}
          </span>
          <span className="text-sm font-bold text-gray-900">
            ${price.toLocaleString()}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
          <Link to={`/properties/${_id}`} className="hover:text-blue-600">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {city}, {country}
        </p>
        {author && (
          <p className="text-xs text-gray-400 mb-2">Listed by {author.name || author.username}</p>
        )}
        {showActions && (
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => onEdit(_id)}
              className="flex-1 text-sm text-blue-600 hover:bg-blue-50 py-1 rounded-lg transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(_id)}
              className="flex-1 text-sm text-red-500 hover:bg-red-50 py-1 rounded-lg transition-colors"
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
