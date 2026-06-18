import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { register as apiRegister } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      const { data: res } = await apiRegister(data);
      login(res.user);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create account</h1>
        <p className="text-sm text-gray-500 mb-6">Join PropSpace and list your properties</p>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputField
            label="Username"
            placeholder="johndoe"
            error={errors.username?.message}
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'At least 3 characters' },
              pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Alphanumeric only' },
            })}
          />
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
