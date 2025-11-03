import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'

const Homepage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='w-full h-screen px-2 py-2 sm:px-[15%] sm:py-[5%]'>
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl 
                h-[100%] grid ${selectedUser
          ? 'grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
          : 'grid-cols-1 md:grid-cols-2'
        }`}>
        <SideBar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <ChatContainer
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        {selectedUser && (
          <RightSidebar
            selectedUser={selectedUser}
          />
        )}
      </div>
    </div>
  )
}

export default Homepage