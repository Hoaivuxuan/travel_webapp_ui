import Link from 'next/link';
import SearchForm from '@/components/home/SearchForm';
import { fetchResults } from '@/lib/fetchResults';
import { notFound } from 'next/navigation';
import { listings } from '@/data/fakeData';

type Props = {
  searchParams: SearchParams;
};

export type SearchParams = {
  url: URL;
  group_adults: string;
  group_children: string;
  no_rooms: string;
  checkin: string;
  checkout: string;
};

async function SearchPage({ searchParams }: Props) {
  if (!searchParams.url) return notFound();

  let results = null;
  if (!results) {
    results = listings;
  }

  return (
    <section>
      <div className='p-6 mx-auto max-w-7xl lg:px-8'>
        <div className='pt-4 pb-8'>
          <SearchForm />
        </div>

        <h1 className='pb-3 text-4xl font-bold'>Your Trip Results</h1>

        <h2 className='pb-3'>
          Dates of trip:
          <span className='ml-2 italic'>
            {searchParams.checkin} to {searchParams.checkout}
          </span>
        </h2>

        <hr className='mb-5' />

        <div className='mt-5 space-y-2'>
          {results.content.listHotels.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
              <div className="col-span-1 flex justify-center items-center h-[200px]">
                <img
                  src={item.url}
                  alt={`Image of ${item.name}`}
                  className="rounded-lg w-full h-auto"
                />
              </div>

              <div className="col-span-2">
                <p className='mb-2 font-bold text-blue-600 text-lg'>{item.name}</p>
                <p className="text-sm mb-2">{item.type}</p>
              </div>

              <div className="col-span-1">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex justify-end space-x-2 text-right">
                    <div>
                      <p className="font-bold">{item.rating}</p>
                      <p className="text-xs">{item.reviewCount} reviews</p>
                    </div>
                    <p className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-900 rounded-lg">
                      {item.rating || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col justify-end col-span-1 h-full'>
                <div className='flex flex-col justify-end items-end mt-2'>
                  <p className='text-xl font-bold text-orange-600 text-right'>{item.price} VNĐ/ngày</p>
                  <Link
                    href='#'
                    className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2'>
                    Chọn phòng
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

export default SearchPage;
