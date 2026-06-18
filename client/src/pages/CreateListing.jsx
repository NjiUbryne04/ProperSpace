import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProperty } from '../api/properties';
import ListingForm from '../components/ListingForm';

const CreateListing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      await createProperty(data);
      navigate('/listings/mine');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">New Listing</h1>
      <p className="text-gray-500 mb-6">Fill in the details to list your property</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <ListingForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default CreateListing;
