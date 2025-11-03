import React, { useState } from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const SideBar = ({ selectedUser, setSelectedUser }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter users based on search term
    const filteredUsers = userDummyData.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mock online status - in real app this would come from backend
    const getOnlineStatus = (userId) => {
        const onlineUsers = ['680f50aaf10f3cd28382ecf2', '680f50e4f10f3cd28382ecf9', '680f510af10f3cd28382ed01'];
        return onlineUsers.includes(userId);
    };

    // Mock unread messages count
    const getUnreadCount = (userId) => {
        const unreadCounts = {
            '680f50aaf10f3cd28382ecf2': 4,
            '680f50e4f10f3cd28382ecf9': 0,
            '680f510af10f3cd28382ed01': 2,
            '680f5137f10f3cd28382ed10': 0,
            '680f516cf10f3cd28382ed11': 0
        };
        return unreadCounts[userId] || 0;
    };

    return (
        <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-auto text-white ${selectedUser ? "max-md:hidden" : ''}`}>
            {/* Header */}
            <div className='pb-5'>
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex items-center gap-2'>
                        <img src={assets.logo_icon} alt="logo" className='w-8 h-8' />
                        <span className='text-xl font-semibold'>QuickChat</span>
                    </div>
                    <div className='relative py-2 group'>
                        <img src={assets.menu_icon} alt="menu" className='max-h-5 cursor-pointer' />
                        <div className='absolute top-full right-0 z-20 w-32 p-3 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
                            <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm hover:text-white'>Edit Profile</p>
                            <hr className='my-2 border-t border-gray-500' />
                            <p onClick={() => navigate('/login')} className='cursor-pointer text-sm hover:text-white'>Logout</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className='relative'>
                    <img src={assets.search_icon} alt="search" className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4' />
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full pl-10 pr-4 py-2 bg-[#282142]/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500'
                    />
                </div>
            </div>

            {/* User List */}
            <div className='space-y-2'>
                {filteredUsers.map((user) => {
                    const isOnline = getOnlineStatus(user._id);
                    const unreadCount = getUnreadCount(user._id);
                    const isSelected = selectedUser && selectedUser._id === user._id;

                    return (
                        <div
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#282142]/30 ${isSelected ? 'bg-[#8185B2]/20 border border-[#8185B2]/40' : ''
                                }`}
                        >
                            {/* Profile Picture */}
                            <div className='relative'>
                                <img
                                    src={user.profilePic}
                                    alt={user.fullName}
                                    className='w-12 h-12 rounded-full object-cover'
                                />
                                {isOnline && (
                                    <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#8185B2]/10 rounded-full'></div>
                                )}
                            </div>

                            {/* User Info */}
                            <div className='flex-1 min-w-0'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-white font-medium truncate'>{user.fullName}</h3>
                                    {unreadCount > 0 && (
                                        <span className='bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                                            {unreadCount}
                                        </span>
                                    )}
                                </div>
                                <p className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                                    {isOnline ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default SideBar;
