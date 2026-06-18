import { useState } from 'react';

const FilterSidebar = ({ onFilter }) => {
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ city: city.trim(), minPrice, maxPrice });
  };

  const handleReset = () => {
    setCity('');
    setMinPrice('');
    setMaxPrice('');
    onFilter({});
  };

  return (
    <aside className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-fit">
      <h2 className="font-semibold text-gray-800 mb-4">Filter Listings</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">City</label>
          <input
            type="text"
            placeholder="e.g. Nairobi"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Min Price (FCFA)</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Max Price (FCFA)</label>
          <input
            type="number"
            placeholder="Any"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear Filters
        </button>
      </form>
    </aside>
  );
};

export default FilterSidebar;
