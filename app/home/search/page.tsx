import Link from 'next/link';
import SearchForm from '@/components/home/SearchForm';
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

              <div className="col-span-2 w-[500px]">
                <p className='mt-2 font-bold text-blue-600 text-lg'>{item.name}</p>
                <p className="bg-blue-200 text-blue-600 rounded-lg px-3 py-1 text-sm inline-block mt-2">{item.type}</p>
                <div className="flex flex-wrap items-center space-x-2 mt-2 relative">
                  {item.amenities.length > 3 ? (
                    <>
                      {item.amenities.slice(0, 3).map((amenity, index) => (
                        <div
                          key={index}
                          className="bg-gray-200 text-gray-600 rounded-lg px-3 py-1 my-1 text-sm flex items-center">
                          {amenity}
                        </div>
                      ))}
                      <div
                        className="bg-gray-200 text-gray-600 rounded-lg px-3 py-1 my-1 text-sm flex items-center relative group">
                        {item.amenities.length - 3}+
                        <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white p-4 rounded-lg text-sm w-max">
                          Cơ sơ lưu trú này có: 
                          <ul className="list-disc pl-5">
                            {item.amenities.map((amenity, index) => (
                              <li key={index} className="text-white">
                                {amenity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    item.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 text-gray-600 rounded-lg px-3 py-1 my-1 text-sm flex items-center">
                        {amenity}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <div className="flex flex-col items-end h-full">
                  <div className="flex items-center space-x-2 text-right mt-2">
                    <p className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-600 rounded-lg">
                      {item.rating.toFixed(1) || 'N/A'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-right mt-2">
                    <p className="text-sm">{item.reviewCount} lượt đánh giá</p>
                  </div>
                </div>
              </div>
              
              <div className='flex flex-row justify-between col-span-1 h-full'>
                <div className="border-l border-gray-300 h-full mx-2"></div>
                <div className='flex flex-col justify-end items-end mt-2'>
                  <p className='text-lg font-bold text-blue-600 text-right'>{item.price.toLocaleString('vi-VN')} VNĐ/đêm</p>
                  <Link
                    href={`/home/detail/${item.id}`}
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
