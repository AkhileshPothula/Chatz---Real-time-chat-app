import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const RightSidebar = ({ selectedUser }) => {
  const navigate = useNavigate();

  // Don't show right sidebar when no user is selected
  if (!selectedUser) {
    return null;
  }

  return (
    <div className='bg-[#8185B2]/10 h-full p-5 rounded-l-xl overflow-y-auto text-white'>
      {/* User Profile Section */}
      <div className='text-center mb-8'>
        <div className='relative mb-4'>
          <img
            src={selectedUser.profilePic}
            alt={selectedUser.fullName}
            className='w-24 h-24 rounded-full object-cover mx-auto border-4 border-[#8185B2]/30'
          />
          <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-[#8185B2]/10 rounded-full'></div>
        </div>
        <h2 className='text-xl font-semibold text-white mb-1'>{selectedUser.fullName}</h2>
        <div className='flex items-center justify-center gap-2 mb-3'>
          <div className='w-2 h-2 bg-green-500 rounded-full'></div>
          <span className='text-green-400 text-sm'>Online</span>
        </div>
        <p className='text-gray-300 text-sm leading-relaxed'>
          {selectedUser.bio}
        </p>
      </div>

      {/* Media Section */}
      <div className='mb-8'>
        <h3 className='text-lg font-semibold text-white mb-4'>Media</h3>
        <div className='grid grid-cols-2 gap-3'>
          {imagesDummyData.slice(0, 4).map((image, index) => (
            <div key={index} className='relative group cursor-pointer'>
              <img
                src={image}
                alt={`Media ${index + 1}`}
                className='w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors duration-200'></div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className='mb-8'>
        <h3 className='text-lg font-semibold text-white mb-4'>About</h3>
        <div className='space-y-3'>
          <div className='flex items-center gap-3 p-3 bg-[#282142]/30 rounded-lg'>
            <div className='w-8 h-8 bg-[#8185B2]/20 rounded-full flex items-center justify-center'>
              <span className='text-xs'>📧</span>
            </div>
            <div>
              <p className='text-sm text-gray-400'>Email</p>
              <p className='text-white text-sm'>{selectedUser.email}</p>
            </div>
          </div>
          <div className='flex items-center gap-3 p-3 bg-[#282142]/30 rounded-lg'>
            <div className='w-8 h-8 bg-[#8185B2]/20 rounded-full flex items-center justify-center'>
              <span className='text-xs'>🕒</span>
            </div>
            <div>
              <p className='text-sm text-gray-400'>Last Seen</p>
              <p className='text-white text-sm'>Just now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='space-y-3'>
        <button className='w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200'>
          Start Voice Call
        </button>
        <button className='w-full bg-[#282142]/50 border border-gray-600 text-white py-3 rounded-lg font-medium hover:bg-[#282142]/70 transition-colors duration-200'>
          Start Video Call
        </button>
        <button
          onClick={() => navigate('/profile')}
          className='w-full bg-[#282142]/50 border border-gray-600 text-white py-3 rounded-lg font-medium hover:bg-[#282142]/70 transition-colors duration-200'
        >
          View Profile
        </button>
      </div>

      {/* Logout Button */}
      <div className='mt-8 pt-6 border-t border-gray-600/30'>
        <button
          onClick={() => navigate('/login')}
          className='w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default RightSidebar
