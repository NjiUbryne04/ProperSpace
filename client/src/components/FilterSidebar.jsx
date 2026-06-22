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
    <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-fit">
      <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <h2 className="font-semibold text-white text-sm">Filter Listings</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">City</label>
          <input
            type="text"
            placeholder="e.g. Douala"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:bg-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Min Price (FCFA)</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input-field w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:bg-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Max Price (FCFA)</label>
          <input
            type="number"
            placeholder="Any"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input-field w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:bg-white placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="btn-primary py-2.5 rounded-xl text-sm font-semibold"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-gray-400 hover:text-indigo-600 transition-colors font-medium"
        >
          Clear Filters
        </button>
      </form>
    </aside>
  );
};

export default FilterSidebar;
