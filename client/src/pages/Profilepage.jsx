import React, { useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Profilepage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: 'John Johnson',
    bio: 'Hi Everyone, I am Using QuickChat',
    profileImage: assets.avatar_icon
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setProfileData({
          ...profileData,
          profileImage: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Profile saved:', profileData);
    // Save profile data logic here
    navigate('/'); // Navigate back to homepage
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4'>
      {/* Background decorative blobs */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-3xl'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl'></div>

      <div className='w-full max-w-md mx-auto relative z-10'>
        <div className='bg-black/30 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-8 shadow-2xl'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <button
              onClick={handleBack}
              className='w-10 h-10 bg-gray-800/50 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700/50 transition-colors'
            >
              <img src={assets.arrow_icon} alt="Back" className='w-5 h-5 rotate-180' />
            </button>
            <h2 className='text-xl font-semibold text-white'>Profile details</h2>
            <div className='w-10'></div> {/* Spacer */}
          </div>

          <form onSubmit={handleSave} className='space-y-6'>
            {/* Profile Image Upload */}
            <div className='flex flex-col items-center'>
              <div className='relative'>
                <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-gray-600/50 mb-4'>
                  <img
                    src={selectedImage || profileData.profileImage}
                    alt="Profile"
                    className='w-full h-full object-cover'
                  />
                </div>
                <label
                  htmlFor="profileImageUpload"
                  className='absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-600 hover:to-blue-600 transition-all'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                <input
                  type="file"
                  id="profileImageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className='hidden'
                />
              </div>
              <p className='text-purple-400 text-sm cursor-pointer hover:text-purple-300 transition-colors'>
                upload profile image
              </p>
            </div>

            {/* Name Input */}
            <div>
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className='w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors'
                required
              />
            </div>

            {/* Bio Textarea */}
            <div>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Write profile bio"
                rows="4"
                className='w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none'
                required
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className='w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-[1.02]'
            >
              Save
            </button>
          </form>
        </div>

        {/* Display current profile info on the right (for larger screens) */}
        <div className='hidden lg:block absolute top-0 left-full ml-8 w-80'>
          <div className='bg-black/20 backdrop-blur-lg border border-gray-600/30 rounded-2xl p-6'>
            <h3 className='text-white font-semibold mb-4'>Preview</h3>
            <div className='flex items-center space-x-4'>
              <img
                src={selectedImage || profileData.profileImage}
                alt="Profile Preview"
                className='w-16 h-16 rounded-full object-cover border-2 border-gray-600/50'
              />
              <div>
                <h4 className='text-white font-medium'>{profileData.fullName}</h4>
                <p className='text-gray-300 text-sm mt-1'>{profileData.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profilepage
