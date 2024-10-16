'use client';

import { useParams, notFound } from 'next/navigation';
import { listings } from '@/data/fakeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCar, faClock, faGasPump, faHotel, faInfoCircle, faMoneyBill1Wave, faSuitcase, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const RentalDetailPage = () => {
  const { id } = useParams();
  const rentalItem = listings.content.listMotors.find(item => item.id.toString() === id);

  if (!rentalItem) return notFound();

  const getCarImageUrl = (model: string, token: string) => {
    const img_model = model.replaceAll(' ', '-').toLowerCase();
    return `https://firebasestorage.googleapis.com/v0/b/travel-web-32360.appspot.com/o/${img_model}.jpg?alt=media&token=${token}`;
  };

  return (
    <section className='p-6 mx-auto max-w-6xl grid grid-cols-4 gap-4'>
      {/* Left Column: Vehicle Information */}
      <div className='col-span-3 p-4 bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200'>
        <div className='grid grid-cols-2 gap-4 my-4 pb-4'>
          <img
            src={getCarImageUrl(rentalItem.model, rentalItem.token)}
            alt={`Image of ${rentalItem.model}`}
            className='rounded-lg w-full h-auto'
          />
          <div>
            <div className='pb-4'>
              <h1 className='text-2xl font-bold'>{rentalItem.model}</h1>
              <p className='text-gray-500 text-sm'>Cung cấp bởi Mioto Ho Chi Minh City</p>
            </div>
            <h2 className='text-xl font-semibold'>THÔNG TIN CHI TIẾT</h2>
            <div className='px-2 space-y-2'>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faUserFriends} className='mr-2 w-4' />
                <span>Số ghế: {rentalItem.details.seats}</span>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faCalendar} className='mr-2 w-4' />
                <span>Năm: {rentalItem.details.year}</span>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faCar} className='mr-2 w-4' />
                <span>Hộp số: {rentalItem.details.transmission}</span>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faSuitcase} className='mr-2 w-4' />
                <span>Khối lượng hành lý: {rentalItem.details.baggage_capacity}</span>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faGasPump} className='mr-2 w-4' />
                <span>Loại nhiên liệu: {rentalItem.details.fuel_type}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <h3 className='text-lg font-semibold'>TIỆN ÍCH</h3>
          <div className='space-y-2 px-2'>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faMoneyBill1Wave} className='mr-2 w-4' />
              <span>Đặt Cọc Bằng Tiền Mặt Hoặc Chuyển Khoản Ngân Hàng</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faHotel} className='mr-2 w-4' />
              <span>Đón/trả miễn phí tại khách sạn</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faClock} className='mr-2 w-4' />
              <span>Áp dụng phí trong trường hợp trả xe muộn</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faInfoCircle} className='mr-2 w-4' />
              <span>Không có thông tin về bảo hiểm.</span>
            </div>
          </div>
        </div>

        {/* Rental Policies Section */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>Chính sách thuê xe</h3>
          <div className='space-y-2 px-2'>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faClock} className='mr-2 w-4' />
              <span>Sử dụng tối đa 24 giờ mỗi ngày thuê</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faGasPump} className='mr-2 w-4' />
              <span>Trả xe với cùng mức nhiên liệu khi nhận</span>
            </div>
          </div>
          <button className='mt-2 text-blue-500'>Tìm hiểu thêm</button>
        </div>

        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>Yêu cầu thuê xe</h3>
          <div className='space-y-2 px-2'>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faUserFriends} className='mr-2 w-4' />
              <span>CCCD / Passport</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faMoneyBill1Wave} className='mr-2 w-4' />
              <span>Đặt cọc VND 15.000.000</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faCar} className='mr-2 w-4' />
              <span>Giấy phép Lái xe và Giấy phép lái xe Quốc tế</span>
            </div>
          </div>
          <button className='mt-2 text-blue-500'>Tìm hiểu thêm</button>
        </div>
      </div>

      {/* Right Column: Pricing Information */}
      <div className='col-span-1 p-4 bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200'>
        <h3 className='text-lg font-semibold'>CHI TIẾT GIÁ CẢ</h3>
        <p className='text-xl font-bold'>{rentalItem.price} VNĐ</p>
        
        <div className='flex flex-col space-y-2 mt-6'>
          <button className='bg-[#018DF3] text-white py-2 rounded'>Đặt ngay</button>
          <button className='border border-gray-300 py-2 rounded'>Chi tiết</button>
        </div>
      </div>
    </section>
  );
};

export default RentalDetailPage;
