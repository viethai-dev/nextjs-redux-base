'use client';

import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUserProfile, updateUserProfile, updateTheme, toggleNotifications } from '../slices/userSlice';
import { useEffect, useState } from 'react';

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile('1'));
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const handleThemeChange = () => {
    const newTheme = profile?.preferences.theme === 'light' ? 'dark' : 'light';
    dispatch(updateTheme(newTheme));
  };

  if (loading && !profile) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchUserProfile('1'))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Profile</h2>
        
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
        )}
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            
            <div className="flex gap-2 justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-700 disabled:bg-green-300 text-white font-bold py-2 px-4 rounded"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-semibold">{profile.name}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{profile.email}</p>
            </div>
            
            {profile.bio && (
              <div>
                <p className="text-gray-600">Bio</p>
                <p className="font-semibold">{profile.bio}</p>
              </div>
            )}
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Preferences</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Theme:</span>
                  <button
                    onClick={handleThemeChange}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    {profile.preferences.theme}
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Notifications:</span>
                  <button
                    onClick={() => dispatch(toggleNotifications())}
                    className={`font-bold py-1 px-3 rounded text-sm ${
                      profile.preferences.notifications
                        ? 'bg-green-500 hover:bg-green-700 text-white'
                        : 'bg-red-500 hover:bg-red-700 text-white'
                    }`}
                  >
                    {profile.preferences.notifications ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
