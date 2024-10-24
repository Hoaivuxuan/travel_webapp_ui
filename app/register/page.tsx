'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Dùng để điều hướng trang

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Trạng thái để lưu thông báo lỗi
  const router = useRouter(); // Sử dụng useRouter để điều hướng trang

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu không khớp
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    // Reset lỗi khi mọi thứ đều đúng
    setError('');

    // Logic đăng ký ở đây (nếu có, ví dụ: gọi API)
    // Sau khi đăng ký thành công, chuyển hướng người dùng tới trang đăng nhập
    router.push('/login');
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[#f0f4f8]'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md w-96'>
        <h2 className='text-2xl mb-6 text-center'>Đăng Ký</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>} {/* Hiển thị lỗi nếu có */}
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
        <button type='submit' className='w-full bg-[#013B94] text-white p-2 rounded'>
          Đăng Ký
        </button>
        <p className='mt-4 text-center'>
          Đã có tài khoản? <a href='/login' className='text-blue-600'>Đăng nhập ở đây</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
