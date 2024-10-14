'use client';

import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlane, faCar, faMap } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@headlessui/react';

const products = [
  { name: 'stays', title: 'LƯU TRÚ', href: '/', icon: faHome },
  { name: 'flights', title: 'CHUYẾN BAY', href: '/', icon: faPlane },
  { name: 'rental', title: 'CHO THUÊ XE', href: '/rental', icon: faCar },
  { name: 'travel_guides', title: 'ĐIỂM THAM QUAN', href: '/', icon: faMap },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const handleLinkClick = (name: SetStateAction<string>, href: string) => {
    setMobileMenuOpen(false);
    setActiveItem(name); // Set active item on link click
  };

  const handleLogoClick = () => {
    setActiveItem('');
  };

  return (
    <header className='bg-[#013B94]'>
      <nav className='flex items-center justify-between p-6 mx-auto max-w-7xl'>
        <Link href='/' className='flex items-center' onClick={handleLogoClick}>
          <span className='sr-only'>Booking.com</span>
          <img
            className='h-12'
            src='https://static1.squarespace.com/static/5bde0f00c3c16aa95581e2e2/62b4cb1add9d257dd43bb03d/62b653fedc7c895918d19b24/1656116254983/booking+logo+white.png?format=1500w'
            alt='Logo'
          />
        </Link>

        <div className='flex lg:hidden'>
          <button
            type='button'
            className='p-2.5 text-white'
            onClick={() => setMobileMenuOpen(true)}>
            <FontAwesomeIcon icon={['fas', 'bars']} className='w-6 h-6' aria-hidden='true' />
          </button>
        </div>

        <div className='hidden lg:flex lg:gap-x-12 justify-between flex-grow'>
          <div className='flex justify-center flex-grow'>
            {products.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleLinkClick(item.name, item.href)}
                className={`flex items-center text-sm font-semibold text-white mx-4 ${
                  item.href !== '#' && item.name === activeItem ? 'bg-blue-600 rounded-lg p-2' : ''
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className='h-5 w-5 mr-2' aria-hidden='true' />
                {item.title}
              </Link>
            ))}
          </div>

          <Link 
            href='/login' 
            onClick={() => handleLinkClick('Đăng Nhập', '/login')}
            className='ml-4 px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-200'>
            Đăng Nhập
          </Link>
        </div>
      </nav>

      <Dialog as='div' open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className='fixed inset-0 z-10 bg-black opacity-30' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-20 w-full bg-[#013B94] p-6'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='flex items-center' onClick={handleLogoClick}>
              <img
                className='h-8'
                src='https://static1.squarespace.com/static/5bde0f00c3c16aa95581e2e2/62b4cb1add9d257dd43bb03d/62b653fedc7c895918d19b24/1656116254983/booking+logo+white.png?format=1500w'
                alt='Logo'
              />
            </Link>
            <button
              type='button'
              className='text-white'
              onClick={() => setMobileMenuOpen(false)}>
              <FontAwesomeIcon icon={['fas', 'times']} className='w-6 h-6' aria-hidden='true' />
            </button>
          </div>

          <div className='mt-6'>
            {products.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleLinkClick(item.name, item.href)}
                className={`block p-2 text-base font-semibold text-white rounded-lg hover:bg-blue-800 ${
                  item.href !== '#' && item.name === activeItem ? 'bg-blue-600' : ''
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className='mr-2' />
                {item.title}
              </Link>
            ))}
            <Link
              href='/login'
              onClick={() => handleLinkClick('Đăng Nhập', '/login')}
              className='block p-2 text-base font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition duration-200'>
              Đăng Nhập
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
