import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateProfile } from '../api/users';
import { changePassword } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';

const Profile = () => {
  const { user, refetch } = useAuth();
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErr, setProfileErr] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  const {
    register: regProfile,
    handleSubmit: handleProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: { name: user?.name || '', phone: user?.phone || '', avatarUrl: user?.avatarUrl || '' },
  });

  const {
    register: regPw,
    handleSubmit: handlePw,
    reset: resetPw,
    formState: { errors: pwErrors },
  } = useForm();

  const onProfileSubmit = async (data) => {
    setProfileMsg('');
    setProfileErr('');
    setProfileLoading(true);
    try {
      await updateProfile(data);
      await refetch();
      setProfileMsg('Profile updated successfully');
    } catch (err) {
      setProfileErr(err.response?.data?.message || 'Update failed');
    } finally {
      setProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    setPwMsg('');
    setPwErr('');
    setPwLoading(true);
    try {
      await changePassword(data);
      setPwMsg('Password changed — please log in again');
      resetPw();
    } catch (err) {
      setPwErr(err.response?.data?.message || 'Password change failed');
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Personal Information</h2>
        {profileMsg && <p className="text-green-600 text-sm mb-3">{profileMsg}</p>}
        {profileErr && <p className="text-red-500 text-sm mb-3">{profileErr}</p>}
        <form onSubmit={handleProfile(onProfileSubmit)} className="flex flex-col gap-4">
          <InputField
            label="Display Name"
            placeholder="John Doe"
            error={profileErrors.name?.message}
            {...regProfile('name')}
          />
          <InputField
            label="Phone Number"
            placeholder="+254 712 345 678"
            error={profileErrors.phone?.message}
            {...regProfile('phone')}
          />
          <InputField
            label="Avatar URL"
            placeholder="https://..."
            error={profileErrors.avatarUrl?.message}
            {...regProfile('avatarUrl')}
          />
          <button
            type="submit"
            disabled={profileLoading}
            className="bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {profileLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Change Password</h2>
        {pwMsg && <p className="text-green-600 text-sm mb-3">{pwMsg}</p>}
        {pwErr && <p className="text-red-500 text-sm mb-3">{pwErr}</p>}
        <form onSubmit={handlePw(onPasswordSubmit)} className="flex flex-col gap-4">
          <InputField
            label="Current Password"
            type="password"
            placeholder="••••••••"
            error={pwErrors.oldPassword?.message}
            {...regPw('oldPassword', { required: 'Current password required' })}
          />
          <InputField
            label="New Password"
            type="password"
            placeholder="••••••••"
            error={pwErrors.newPassword?.message}
            {...regPw('newPassword', {
              required: 'New password required',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
          />
          <button
            type="submit"
            disabled={pwLoading}
            className="bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {pwLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
