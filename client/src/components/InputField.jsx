const InputField = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default InputField;
