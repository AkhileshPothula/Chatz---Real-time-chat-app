import React, { useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Loginpage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // false = signup, true = login
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log('Login:', { email: formData.email, password: formData.password });
      // Navigate to homepage after successful login
      navigate('/');
    } else {
      // Handle signup logic
      console.log('Signup:', formData);
      // Navigate to homepage after successful signup
      navigate('/');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4'>
      {/* Background decorative blobs */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-3xl'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl'></div>

      <div className='flex items-center justify-center w-full max-w-6xl mx-auto relative z-10'>
        {/* Left side - Logo */}
        <div className='hidden lg:flex flex-col items-center justify-center flex-1'>
          <div className='flex flex-col items-center mb-8'>
            <div className='relative mb-6'>
              <div className='w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl'>
                <div className='flex space-x-2'>
                  <div className='w-3 h-3 bg-white rounded-full'></div>
                  <div className='w-3 h-3 bg-white rounded-full'></div>
                  <div className='w-3 h-3 bg-white rounded-full'></div>
                </div>
              </div>
            </div>
            <h1 className='text-5xl font-bold text-white mb-4'>QuickChat</h1>
            <p className='text-gray-300 text-lg text-center max-w-md'>
              Connect with friends and family instantly. Start your conversation today.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className='w-full max-w-md mx-auto lg:mx-0'>
          <div className='bg-black/30 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-8 shadow-2xl'>
            <h2 className='text-2xl font-semibold text-white mb-6'>
              {isLogin ? 'Sign in' : 'Sign up'}
            </h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className='w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors'
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors'
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className='w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors'
                />
              </div>

              {!isLogin && (
                <div className='flex items-center space-x-2'>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    required={!isLogin}
                    className='w-4 h-4 bg-gray-800/50 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
                  />
                  <label htmlFor="terms" className='text-sm text-gray-300'>
                    Agree to the terms of use & privacy policy.
                  </label>
                </div>
              )}

              <button
                type="submit"
                className='w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-[1.02]'
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-gray-300 text-sm'>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className='text-purple-400 hover:text-purple-300 font-medium transition-colors'
                >
                  {isLogin ? 'Sign up here' : 'Login here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loginpage
