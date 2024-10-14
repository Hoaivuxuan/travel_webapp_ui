'use client';

import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    window.location.href = '/home';
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[#f0f4f8]'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md w-96'>
        <h2 className='text-2xl mb-6 text-center'>Đăng Nhập</h2>
        <div className='mb-4'>
          <label className='block mb-2'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Mật Khẩu</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <button type='submit' className='w-full bg-[#013B94] text-white p-2 rounded'>
          Đăng Nhập
        </button>
        <p className='mt-4 text-center'>
          Chưa có tài khoản? <a href='/register' className='text-blue-600'>Đăng ký ở đây</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;