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
};

async function RentalSearchPage({ searchParams }: Props) {
  if (!searchParams.url) return notFound();

  let results = null;
  if (!results) {
    results = listings;
  }

  return (
    <section>
      <div className='p-6 mx-auto max-w-7xl lg:px-8'>
        <div className='py-8'>
          <RentalSearchForm />
        </div>

        <h1 className='pb-3 text-4xl font-bold'>Car Rental Without Driver</h1>

        <h2 className='pb-3 italic'>
          {searchParams.location}
          <span className='ml-2'>
            từ {searchParams.checkin} đến {searchParams.checkout}
          </span>
        </h2>

        <hr className='mb-5' />

        <div className='mt-5 space-y-4'>
          {results.content.listCars.map((item, i) => (
            <div
              key={i}
              className='flex p-4 space-x-4 border rounded-lg hover:shadow-lg transition-shadow duration-200'>
              
              <img
                src={item.url}
                alt={`Image of ${item.model}`}
                className='rounded-lg h-32 w-auto'
              />

              <div className='flex flex-col justify-between flex-1'>
                <div>
                  <p className='font-bold text-blue-600 text-lg'>{item.model}</p>
                  <p className='text-sm text-gray-700 flex items-center'>
                    <FontAwesomeIcon icon={faCar} className='mr-1 w-4' />
                    {item.details.transmission}
                  </p>
                  <p className='text-sm flex items-center text-gray-600'>
                    <FontAwesomeIcon icon={faUserFriends} className='mr-1 w-4' />
                    {item.details.seats} ghế
                  </p>
                  <p className='text-sm flex items-center text-gray-600'>
                    <FontAwesomeIcon icon={faSuitcase} className='mr-1 w-4' />
                    {item.details.baggage_capacity} hành lý
                  </p>
                </div>

                <div className='flex justify-between items-center mt-2'>
                  <p className='text-xl font-bold text-orange-600 text-right flex-1'>{item.price} VNĐ/ngày</p>
                  <Link
                    href={`/rental/${item.id}`}
                    className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold ml-4'>
                    Tiếp tục
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RentalSearchPage;
