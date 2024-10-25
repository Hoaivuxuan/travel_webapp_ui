'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import Notification from '@/components/Notification';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const { notifySuccess, notifyWarning } = Notification();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notifyWarning('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    notifySuccess('Bạn đã đăng ký thành công!');
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[#f0f4f8]'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md w-96'>
        <h2 className='text-2xl mb-6 text-center'>Đăng Ký</h2>
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
        <div className='mb-4'>
          <label className='block mb-2'>Xác Nhận Mật Khẩu</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div className='mt-4'>
          <button type='submit' className='w-full bg-[#013B94] text-white p-2 rounded'>
            Đăng Ký
          </button>
          <p className='mt-2 text-center'>
            Đã có tài khoản? <a href='/login' className='text-blue-600'>Đăng nhập ở đây</a>
          </p>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
