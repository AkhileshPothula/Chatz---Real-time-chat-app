import React, { useState, useRef, useEffect } from 'react'
import assets, { messagesDummyData } from '../assets/assets'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(messagesDummyData);
  const messagesEndRef = useRef(null);

  // Mock current user ID - in real app this would come from auth context
  const currentUserId = '680f5116f10f3cd28382ed02';

  // Filter messages for the selected user
  const filteredMessages = selectedUser
    ? messages.filter(msg =>
      (msg.senderId === currentUserId && msg.receiverId === selectedUser._id) ||
      (msg.senderId === selectedUser._id && msg.receiverId === currentUserId)
    )
    : [];

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    const newMessage = {
      _id: Date.now().toString(),
      senderId: currentUserId,
      receiverId: selectedUser._id,
      text: message,
      seen: false,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  // Welcome state when no user is selected
  if (!selectedUser) {
    return (
      <div className='bg-gradient-to-br from-[#8185B2]/20 to-[#4A4A6B]/20 h-full flex items-center justify-center relative overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute top-10 left-10 text-6xl font-bold text-white/10 select-none'>3</div>
        <div className='absolute bottom-20 left-8 text-4xl font-bold text-white/10 select-none'>4</div>

        {/* Main content */}
        <div className='text-center z-10'>
          <div className='mb-6'>
            <img
              src={assets.logo_icon}
              alt="Chat Icon"
              className='w-24 h-24 mx-auto opacity-80'
            />
          </div>
          <h2 className='text-2xl font-semibold text-white mb-2'>
            Chat anytime, anywhere
          </h2>
          <p className='text-gray-300 text-lg'>
            Select a user to start chatting
          </p>
        </div>
      </div>
    );
  }

  // Chat conversation view when user is selected
  return (
    <div className='bg-gradient-to-br from-[#8185B2]/20 to-[#4A4A6B]/20 h-full flex flex-col overflow-hidden'>
      {/* Chat Header */}
      <div className='bg-[#282142]/30 backdrop-blur-sm border-b border-gray-600/30 p-4 flex items-center justify-between flex-shrink-0'>
        <div className='flex items-center gap-3'>
          {/* Mobile back button */}
          <button
            onClick={() => setSelectedUser(null)}
            className='lg:hidden w-8 h-8 bg-[#282142]/50 rounded-full flex items-center justify-center hover:bg-[#282142]/70 transition-colors'
          >
            <img src={assets.arrow_icon} alt="Back" className='w-4 h-4 rotate-180' />
          </button>
          <img
            src={selectedUser.profilePic}
            alt={selectedUser.fullName}
            className='w-10 h-10 rounded-full object-cover'
          />
          <div>
            <h3 className='text-white font-semibold'>{selectedUser.fullName}</h3>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span className='text-green-400 text-sm'>Online</span>
            </div>
          </div>
        </div>
        <div className='w-8 h-8 bg-[#282142]/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#282142]/70 transition-colors'>
          <span className='text-white text-sm font-bold'>i</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 min-h-0 chat-messages'>
        {filteredMessages.map((msg, index) => {
          const isOwnMessage = msg.senderId === currentUserId;
          const showAvatar = index === 0 || filteredMessages[index - 1].senderId !== msg.senderId;
          const showTime = index === filteredMessages.length - 1 ||
            new Date(msg.createdAt).getTime() - new Date(filteredMessages[index + 1].createdAt).getTime() > 300000; // 5 minutes

          return (
            <div key={msg._id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} gap-2`}>
              {!isOwnMessage && showAvatar && (
                <img
                  src={selectedUser.profilePic}
                  alt={selectedUser.fullName}
                  className='w-8 h-8 rounded-full object-cover mt-1 flex-shrink-0'
                />
              )}
              {!isOwnMessage && !showAvatar && <div className='w-8 flex-shrink-0'></div>}

              <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-first' : ''}`}>
                <div className={`p-3 rounded-lg ${isOwnMessage
                  ? 'bg-[#8185B2]/60 text-white'
                  : 'bg-[#282142]/60 text-white'
                  }`}>
                  {msg.text && <p className='text-sm break-words'>{msg.text}</p>}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared image"
                      className='mt-2 rounded-lg max-w-full h-auto'
                    />
                  )}
                </div>
                {showTime && (
                  <p className={`text-xs text-gray-400 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                    {formatTime(msg.createdAt)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className='bg-[#282142]/30 backdrop-blur-sm border-t border-gray-600/30 p-3 sm:p-4 flex-shrink-0'>
        <form onSubmit={handleSendMessage} className='flex items-center gap-2 sm:gap-3'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message"
            className='flex-1 bg-[#282142]/50 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 text-sm sm:text-base'
          />
          <input type="file" id='image' accept='image/png, image/jpeg' hidden/>
          <label htmlFor='image'>
            <img src={assets.gallery_icon} alt="Gallery" className='w-5 mr-2 cursor-pointer' />
            </label>
          <button
            type="submit"
            className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all'
          >
            <img src={assets.send_button} alt="Send" className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatContainer
