import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProperty, updateProperty } from '../api/properties';
import ListingForm from '../components/ListingForm';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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
        if (!cancelled) setFetching(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [id]);

  const handleSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      await updateProperty(id, data);
      navigate('/listings/mine');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update listing');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  const defaultValues = {
    ...property,
    imageUrls: property?.imageUrls?.join(', ') || '',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit Listing</h1>
      <p className="text-gray-500 mb-6">Update your property details</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <ListingForm onSubmit={handleSubmit} defaultValues={defaultValues} loading={loading} />
      </div>
    </div>
  );
};

export default EditListing;
