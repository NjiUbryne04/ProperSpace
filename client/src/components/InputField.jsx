const InputField = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
    )}
    <input
      className={`input-field w-full border rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 focus:bg-white placeholder-gray-400 ${
        error ? 'border-red-400 focus:border-red-400' : 'border-gray-200'
      }`}
      {...props}
    />
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

export default InputField;
