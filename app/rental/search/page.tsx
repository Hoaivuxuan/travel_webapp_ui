'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listings } from '@/data/fakeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faUserFriends, faCar } from '@fortawesome/free-solid-svg-icons';
import RentalSearchForm from '@/components/rental/RentalSearchForm';

type Props = {
  searchParams: RentalSearchParams;
};

export type RentalSearchParams = {
  url: URL;
  location: string;
  checkin: string;
  checkout: string;
  type: string;
};

const getCarImageUrl = (model: string, token: string) => {
  const img_model = model.replaceAll(' ', '-').toLowerCase();
  return `https://firebasestorage.googleapis.com/v0/b/travel-web-32360.appspot.com/o/${img_model}.jpg?alt=media&token=${token}`;
};

async function RentalSearchPage({ searchParams }: Props) {
  if (!searchParams.url) return notFound();

  let results = null;
  if (!results) {
    results = listings;
  }

  const searchResults = searchParams.type === 'cars' ? results.content.listCars : results.content.listMotors;
  const idType = searchParams.type === 'cars' ? 'C' : 'M';
  
  return (
    <section>
      <div className='py-6 mx-auto max-w-7xl'>
        <div className='py-2'>
          <RentalSearchForm />
        </div>

        <h1 className='py-3 text-4xl font-bold'>Car Rental Without Driver</h1>
        <h2 className='pb-3'>
          <span className='ml-2'>
            {searchParams.location}, từ {searchParams.checkin} đến {searchParams.checkout}
          </span>
        </h2>

        <hr className='mb-5' />

        <div className="grid grid-cols-5 gap-4">
          <aside className="col-span-1 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h3 className="font-bold text-sm mb-3">Chọn lọc theo:</h3>
            <hr className="my-2" />
          </aside>
          <div className="col-span-4">
            <div className='space-y-4'>
              {searchResults.map((item, i) => (
                <div
                  key={i}
                  className='grid grid-cols-5 gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200'>
                  
                  <div className='col-span-1 flex justify-center items-center h-[200px]'>
                    <img
                      src={getCarImageUrl(item.model, item.token)}
                      alt={`${idType}${item.id}`}
                      className='rounded-lg w-full h-auto'
                    />
                  </div>
        
                  <div className='flex flex-col justify-between col-span-3'>
                    <div>
                      <p className='mb-4 font-bold text-blue-600 text-lg'>{item.model}</p>
                      <p className='text-sm text-gray-700 flex items-center'>
                        <FontAwesomeIcon icon={faCar} className='mr-2 w-4' />
                        {item.details.transmission.toUpperCase()}
                      </p>
                      <p className='text-sm flex items-center text-gray-600'>
                        <FontAwesomeIcon icon={faUserFriends} className='mr-2 w-4' />
                        {item.details.seats} ghế
                      </p>
                      <p className='text-sm flex items-center text-gray-600'>
                        <FontAwesomeIcon icon={faSuitcase} className='mr-2 w-4' />
                        {item.details.baggage_capacity} hành lý
                      </p>
                    </div>
                  </div>
        
                  <div className='flex flex-col justify-end col-span-1 h-full'>
                    <div className='flex flex-col justify-end items-end mt-2'>
                      <p className="text-lg font-bold text-blue-600 text-right">{item.price.toLocaleString('vi-VN')} VNĐ</p>
                      <Link
                        href={`/rental/${searchParams.type}/${item.id}`}
                        className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2'>
                        Tiếp tục
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentalSearchPage;
