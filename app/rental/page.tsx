'use client';

import RentalSearchForm from '@/components/rental/RentalSearchForm';
import { destination } from '@/data/fakeData';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

const RentalPage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <main className='bg-white'>
      <div className='bg-[#013B94] py-2'>
        <section className='bg-[#013B94] grid grid-cols-2 gap-2 p-6 mx-auto h-[300px] max-w-7xl'>
          <div className='col-span-1'>
            <h2 className='text-4xl font-bold text-white'>Dịch vụ cho thuê xe ô tô và xe máy tự lái giá rẻ tại Booking.com</h2>
            <h3 className='py-5 text-sm text-white'>
              Tìm và đặt ngay dịch vụ cho thuê xe ô tô và xe máy tự lái giá rẻ tại Booking.com - nền tảng du lịch cung cấp dịch vụ cho thuê xe giá rẻ trên khắp Việt Nam
            </h3>
          </div>
        </section>
      </div>
    
      <section className='py-4 px-2 mx-4 -my-14 lg:px-4'>
        <RentalSearchForm />
      </section>
    
      <section className='p-6 mx-auto mt-10 bg-white rounded-t-lg max-w-7xl'>
        <div className='pt-5'>
          <h3 className='text-xl font-bold'>Điểm Đến Đang Thịnh Hành</h3>
          <p className='font-light'>
            Du khách tìm kiếm về Việt Nam cũng đặt chỗ ở những nơi này
          </p>
        </div>
    
        <div className="relative flex items-center">
          <button
            onClick={scrollLeft}
            className="absolute -left-[20px] w-[40px] z-10 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex py-5 space-x-4 overflow-x-hidden scroll-smooth">
            {destination.map((item) => (
              <div key={item.id} className="space-y-1 cursor-pointer shrink-0 w-[233.59px]">
                <img
                  key={item.id}
                  className="object-cover rounded-lg w-80 h-72"
                  src={item.src}
                  alt={item.title}
                />
                <div className="pt-3 px-1">
                  <p className="font-bold">{item.title}</p>
                  <p className="">{item.location}</p>
                  <p className="text-sm font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute -right-[20px] w-[40px] z-10 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default RentalPage;