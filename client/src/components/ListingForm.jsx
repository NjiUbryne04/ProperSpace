import { useForm } from 'react-hook-form';
import InputField from './InputField';

const PROPERTY_TYPES = ['Apartment', 'House', 'Studio'];

const ListingForm = ({ onSubmit, defaultValues = {}, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const processSubmit = (data) => {
    const imageUrls = data.imageUrls
      ? data.imageUrls.split(',').map((u) => u.trim()).filter(Boolean)
      : [];
    onSubmit({ ...data, price: Number(data.price), imageUrls });
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="flex flex-col gap-4">
      <InputField
        label="Title *"
        placeholder="e.g. Cozy 2-bedroom apartment"
        error={errors.title?.message}
        {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'At least 3 characters' } })}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description *</label>
        <textarea
          rows={4}
          placeholder="Describe the property..."
          className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('description', { required: 'Description is required', minLength: { value: 10, message: 'At least 10 characters' } })}
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
      </div>
      <InputField
        label="Price (FCFA/month) *"
        type="number"
        placeholder="e.g. 150000"
        error={errors.price?.message}
        {...register('price', { required: 'Price is required', min: { value: 1, message: 'Must be positive' } })}
      />
      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="City *"
          placeholder="e.g. Nairobi"
          error={errors.city?.message}
          {...register('city', { required: 'City is required' })}
        />
        <InputField
          label="Country *"
          placeholder="e.g. Kenya"
          error={errors.country?.message}
          {...register('country', { required: 'Country is required' })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Property Type *</label>
        <select
          className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.propertyType ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('propertyType', { required: 'Type is required' })}
        >
          <option value="">Select type...</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.propertyType && <p className="text-xs text-red-500">{errors.propertyType.message}</p>}
      </div>
      <InputField
        label="Image URLs (comma-separated)"
        placeholder="https://... , https://..."
        error={errors.imageUrls?.message}
        {...register('imageUrls')}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Save Listing'}
      </button>
    </form>
  );
};

export default ListingForm;
