type Destination = {
  id: number;
  src: string;
  title: string;
  location: string;
  description: string;
};

export const destination: Destination[] = [
  {
    id: 1,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fhanoi.jpg?alt=media&token=c9e7a784-860d-4803-a94d-891846a636b3",
    title: "Hà Nội",
    location: "Hà Nội",
    description: "0 Deals",
  },
  {
    id: 2,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fhcmc.jpg?alt=media&token=12a25919-fb2b-4bd1-8f3e-ec87d054a6ba",
    title: "TP. Hồ Chí Minh",
    location: "TP. Hồ Chí Minh",
    description: "0 Deals",
  },
  {
    id: 3,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fdanang.jpg?alt=media&token=7ec685e3-b166-4955-8a08-9c0c2764e1d9",
    title: "Đà Nẵng",
    location: "Đà Nẵng",
    description: "0 Deals",
  },
  {
    id: 4,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fhaiphong.jpg?alt=media&token=8958e8fc-9555-4563-87ab-e439ea2d3060",
    title: "Hải Phòng",
    location: "Hải Phòng",
    description: "0 Deals",
  },
  {
    id: 5,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fcantho.jpg?alt=media&token=385490f4-524c-4671-a6fb-03dfe06f7ec1",
    title: "Cần Thơ",
    location: "Cần Thơ",
    description: "0 Deals",
  },
  {
    id: 6,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fhanoi.jpg?alt=media&token=c9e7a784-860d-4803-a94d-891846a636b3",
    title: "Hà Nội",
    location: "Hà Nội",
    description: "0 Deals",
  },
  {
    id: 7,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fhcmc.jpg?alt=media&token=12a25919-fb2b-4bd1-8f3e-ec87d054a6ba",
    title: "TP. Hồ Chí Minh",
    location: "TP. Hồ Chí Minh",
    description: "0 Deals",
  },
  {
    id: 8,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fdanang.jpg?alt=media&token=7ec685e3-b166-4955-8a08-9c0c2764e1d9",
    title: "Đà Nẵng",
    location: "Đà Nẵng",
    description: "0 Deals",
  },
  {
    id: 9,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fhaiphong.jpg?alt=media&token=8958e8fc-9555-4563-87ab-e439ea2d3060",
    title: "Hải Phòng",
    location: "Hải Phòng",
    description: "0 Deals",
  },
  {
    id: 10,
    src: "https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/city%2Fcantho.jpg?alt=media&token=385490f4-524c-4671-a6fb-03dfe06f7ec1",
    title: "Cần Thơ",
    location: "Cần Thơ",
    description: "0 Deals",
  },
];

// data/fakeData.ts
export const activitiesSearch = [
  {
    id: 1,
    name: "Buổi biểu diễn múa rối nước Thăng Long",
    address: "Hà Nội",
    isBestSeller: true,
    rating: 4.5,
    reviews: 950,
    price: "80000",
    image_url:
      "https://r-xx.bstatic.com/xdata/images/xphoto/800x800/222171388.jpg?k=5e8c66b47d003a3652ad270a965c8cf854b816db44e51c99ba83e785fd3905c0&o=&quot",
    cancellationPolicy: 1,
    availableDate: "Mở cửa từ 5 tháng 11",
  },
  {
    id: 2,
    name: "Tour đi bộ tham quan thành phố có hướng dẫn viên",
    address: "Hà Nội",
    isBestSeller: true,
    rating: 4.6,
    reviews: 446,
    price: "80000",
    image_url:
      "https://r-xx.bstatic.com/xdata/images/xphoto/800x800/222572168.jpg?k=5f351c429055fff045356847861f726ac480e3d395192ce444fe5ab703b8cd78&o=&quot",
    cancellationPolicy: 0,
    availableDate: "Mở cửa từ 5 tháng 11",
  },
  {
    id: 3,
    name: "Tour ẩm thực phố cổ",
    address: "Hà Nội",
    isBestSeller: false,
    rating: 4.8,
    reviews: 625,
    price: "80000",
    image_url:
      "https://r-xx.bstatic.com/xdata/images/xphoto/800x800/222171388.jpg?k=5e8c66b47d003a3652ad270a965c8cf854b816db44e51c99ba83e785fd3905c0&o=&quot",
    cancellationPolicy: 1,
    availableDate: "Mở cửa từ 5 tháng 11",
  },
  {
    id: 4,
    name: "Tour Vịnh Hạ Long cả ngày có kèm bữa trưa, đi từ Hà Nội",
    address: "Hà Nội",
    isBestSeller: true,
    rating: 4.4,
    reviews: 276,
    price: "800000",
    image_url:
      "https://r-xx.bstatic.com/xdata/images/xphoto/800x800/222171388.jpg?k=5e8c66b47d003a3652ad270a965c8cf854b816db44e51c99ba83e785fd3905c0&o=&quot",
    cancellationPolicy: 0,
    availableDate: "Mở cửa từ 5 tháng 11",
  },
  {
    id: 5,
    name: "Lớp học nấu ăn và tour tham quan chợ",
    address: "Hà Nội",
    isBestSeller: false,
    rating: 4.8,
    reviews: 211,
    price: "80000",
    image_url:
      "https://r-xx.bstatic.com/xdata/images/xphoto/800x800/222171388.jpg?k=5e8c66b47d003a3652ad270a965c8cf854b816db44e51c99ba83e785fd3905c0&o=&quot",
    cancellationPolicy: 1,
    availableDate: "Mở cửa từ 5 tháng 11",
  },
];

export const activities: Destination[] = [
  {
    id: 1,
    src: "https://r-xx.bstatic.com/xdata/images/xphoto/800x800/222171388.jpg?k=5e8c66b47d003a3652ad270a965c8cf854b816db44e51c99ba83e785fd3905c0&o=&quot",
    title: "Tour đi bộ tham quan thành phố có hướng dẫn viên",
    location: "Việt Nam",
    description: "0 Deals",
  },
  {
    id: 2,
    src: "https://r-xx.bstatic.com/xdata/images/xphoto/800x800/222572168.jpg?k=5f351c429055fff045356847861f726ac480e3d395192ce444fe5ab703b8cd78&o=&quot",
    title: "Tour ẩm thực đường phố có hướng dẫn",
    location: "Việt Nam",
    description: "0 Deals",
  },
  {
    id: 3,
    src: "https://q-xx.bstatic.com/xdata/images/xphoto/800x800/134504627.jpg?k=59846544bc292a578cde7b0a595ee412afd4b28a459bd300ef6e60b2d8aed0e2&o=&quot",
    title: "Ninh Binh - Hoa Lu - Mua Cave - Tam Coc 1 Day Tour",
    location: "Việt Nam",
    description: "0 Deals",
  },
  {
    id: 4,
    src: "https://q-xx.bstatic.com/xdata/images/xphoto/800x800/129738758.jpg?k=cf6f7ae9a919901fa00d220fe02d1a652d0e6434351bbc1fc806d485be440b7a&o=&quot",
    title: "Tour Vịnh Hạ Long cả ngày có kèm bữa trưa, đi từ Hà Nội",
    location: "Việt Nam",
    description: "0 Deals",
  },
  {
    id: 5,
    src: "https://r-xx.bstatic.com/xdata/images/city/540x405/640445.jpg?k=50b44df6e3029c95c1874da1ae9634d62ac2264961b917271d56d7637ccb059c&o=",
    title: "Ninh Bình",
    location: "Việt Nam",
    description: "0 Deals",
  },
  {
    id: 6,
    src: "https://q-xx.bstatic.com/xdata/images/city/533x300/981524.jpg?k=855540c54e026d67de390c0bdcee5690fedb503dbc3ad2ef5ae8007c637d682a&o=",
    title: "Hà Nội",
    location: "Việt Nam",
    description: "0 Deals",
  },
  {
    id: 7,
    src: "https://r-xx.bstatic.com/xdata/images/city/540x405/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=",
    title: "TP. Hồ Chí Minh",
    location: "Việt Nam",
    description: "0 Deals",
  },
  {
    id: 8,
    src: "https://r-xx.bstatic.com/xdata/images/city/540x405/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=",
    title: "Đà Nẵng",
    location: "Việt Nam",
    description: "0 Deals",
  },
  {
    id: 9,
    src: "https://r-xx.bstatic.com/xdata/images/city/540x405/688866.jpg?k=fc9d2cb9fe2f6d1160e10542cd2b83f5a8008401d33e8750ee3c2691cf4d4f7e&o=",
    title: "Hội An",
    location: "Việt Nam",
    description: "0 Deals",
  },
  {
    id: 10,
    src: "https://r-xx.bstatic.com/xdata/images/city/540x405/640445.jpg?k=50b44df6e3029c95c1874da1ae9634d62ac2264961b917271d56d7637ccb059c&o=",
    title: "Ninh Bình",
    location: "Việt Nam",
    description: "0 Deals",
  },
];

export const listActivitis = [
  {
    id: 1,
    name: "Buổi biểu diễn múa rối nước Thăng Long",
    description: "Buổi biểu diễn múa rối nước Thăng Long.",
    distanceToCenter: 7,
    roomTypes: "Phòng đôi, Phòng gia đình",
    activities: "Đi bộ, Thư giãn",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    rating: 8.5,
    reviewCount: 30,
    type: "Homestays",
    city: "Ninh Bình",
    location: {
      latitude: 20.25,
      longitude: 105.9884,
    },
    amenities: ["Wi-Fi miễn phí", "Vườn", "Bếp chung"],
    price: 650000,
    url: "https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o=",
  },
];
