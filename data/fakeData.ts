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
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=',
  title: 'Hà Nội',
  location: 'Việt Nam',
  description: '0 Deals',
},
{
  id: 2,
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=',
  title: 'TP. Hồ Chí Minh',
  location: 'Việt Nam',
  description: '0 Deals',
},
{
  id: 3,
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=',
  title: 'Đà Nẵng',
  location: 'Việt Nam',
  description: '0 Deals',
},
{
  id: 4,
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/688866.jpg?k=fc9d2cb9fe2f6d1160e10542cd2b83f5a8008401d33e8750ee3c2691cf4d4f7e&o=',
  title: 'Hội An',
  location: 'Việt Nam',
  description: '0 Deals',
},
{
  id: 5,
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/640445.jpg?k=50b44df6e3029c95c1874da1ae9634d62ac2264961b917271d56d7637ccb059c&o=',
  title: 'Ninh Bình',
  location: 'Việt Nam',
  description: '0 Deals',
},
{
  id: 6,
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=',
  title: 'Hà Nội',
  location: 'Việt Nam',
  description: '0 Deals',
},
{
  id: 7,
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=',
  title: 'TP. Hồ Chí Minh',
  location: 'Việt Nam',
  description: '0 Deals',
},
{
  id: 8,
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=',
  title: 'Đà Nẵng',
  location: 'Việt Nam',
  description: '0 Deals',
},
{
  id: 9,
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/688866.jpg?k=fc9d2cb9fe2f6d1160e10542cd2b83f5a8008401d33e8750ee3c2691cf4d4f7e&o=',
  title: 'Hội An',
  location: 'Việt Nam',
  description: '0 Deals',
},
{
  id: 10,
  src: 'https://r-xx.bstatic.com/xdata/images/city/540x405/640445.jpg?k=50b44df6e3029c95c1874da1ae9634d62ac2264961b917271d56d7637ccb059c&o=',
  title: 'Ninh Bình',
  location: 'Việt Nam',
  description: '0 Deals',
},
];

export const listings = {
content: {
  listHotels: [
    {
      id: 1,
      name: 'The Gallery Homestay - By Pegasy Group',
      rating: 8.0,
      reviewCount: 6,
      type: 'Homestays',
      location: {
        latitude: 21.0294967,
        longitude: 105.8544441
      },
      amenities: ['Wi-Fi miễn phí', 'Điều hòa không khí', 'Không hút thuốc'],
      price: 791667,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
    {
      id: 2,
      name: 'Cozy Central Homestay',
      rating: 7.8,
      reviewCount: 12,
      type: 'Homestays',
      location: {
        latitude: 21.0310245,
        longitude: 105.8521729
      },
      amenities: ['Wi-Fi miễn phí', 'Điều hòa không khí', 'Không hút thuốc'],
      price: 720000,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
    {
      id: 3,
      name: 'Modern Apartment in Heart of Hanoi',
      rating: 8.5,
      reviewCount: 18,
      type: 'Apartments',
      location: {
        latitude: 21.0277834,
        longitude: 105.8501748
      },
      amenities: ['Wi-Fi miễn phí', 'Điều hòa không khí', 'Không hút thuốc'],
      price: 1200000,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
    {
      id: 4,
      name: 'Riverside Boutique Homestay',
      rating: 9.2,
      reviewCount: 28,
      type: 'Homestays',
      location: {
        latitude: 21.0361925,
        longitude: 105.8462587
      },
      amenities: ['Wi-Fi miễn phí', 'Điều hòa không khí', 'Không hút thuốc', 'Hồ bơi'],
      price: 950000,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
    {
      id: 5,
      name: 'Hanoi Deluxe Apartment',
      rating: 8.7,
      reviewCount: 22,
      type: 'Apartments',
      location: {
        latitude: 21.0254174,
        longitude: 105.8428926
      },
      amenities: ['Wi-Fi miễn phí', 'Điều hòa không khí', 'Không hút thuốc', 'Phòng tập gym', 'Ban công'],
      price: 1450000,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
    {
      id: 6,
      name: 'Tranquil Garden Homestay',
      rating: 8.0,
      reviewCount: 15,
      type: 'Homestays',
      location: {
        latitude: 21.0374891,
        longitude: 105.8589225
      },
      amenities: ['Wi-Fi miễn phí', 'Điều hòa không khí', 'Không hút thuốc', 'Vườn'],
      price: 680000,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
    {
      id: 7,
      name: 'Luxury Serviced Apartment',
      rating: 9.0,
      reviewCount: 35,
      type: 'Apartments',
      location: {
        latitude: 21.0233276,
        longitude: 105.8472843
      },
      amenities: ['Wi-Fi miễn phí', 'Điều hòa không khí', 'Không hút thuốc', 'Thang máy', 'Ban công', 'Bếp'],
      price: 2000000,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
    {
      id: 8,
      name: 'Charming Homestay in Old Quarter',
      rating: 8.3,
      reviewCount: 10,
      type: 'Homestays',
      location: {
        latitude: 21.0331234,
        longitude: 105.8455052
      },
      amenities: ['Wi-Fi miễn phí', 'Điều hòa không khí', 'Không hút thuốc', 'Bữa sáng bao gồm'],
      price: 850000,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
    {
      id: 9,
      name: 'Elegant Suites Hoan Kiem',
      rating: 9.5,
      reviewCount: 50,
      type: 'Apartments',
      location: {
        latitude: 21.0245027,
        longitude: 105.8435553
      },
      amenities: ['Wi-Fi miễn phí', 'Điều hòa không khí', 'Không hút thuốc', 'Dịch vụ giặt là'],
      price: 1650000,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
    {
      id: 10,
      name: 'Sunny Hostel Hanoi',
      rating: 7.5,
      reviewCount: 30,
      type: 'Hostels',
      location: {
        latitude: 21.028511,
        longitude: 105.848598
      },
      amenities: ['Wi-Fi miễn phí', 'Không hút thuốc', 'Bếp chung'],
      price: 300000,
      url: 'https://r-xx.bstatic.com/xdata/images/city/526x420/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o='
    },
  ],
  listCars: [
    {
      id: 1,
      model: 'Kia Morning',
      price: '589,280',
      details: {
        transmission: 'Automatic',
        baggage_capacity: 2,
        seats: 4,
        fuel_type: 'Petrol',
        year: 2018,
        safety_features: ['Airbags', 'ABS', 'Rear Camera'],
      },
      token: 'f8e4c654-96a1-4d02-87fe-454bfb1fc9d6',
    },
    {
      id: 2,
      model: 'Hyundai Grand i10',
      price: '589,280',
      details: {
        transmission: 'Automatic',
        baggage_capacity: 2,
        seats: 4,
        fuel_type: 'Petrol',
        year: 2019,
        safety_features: ['Airbags', 'ABS', 'Parking Sensors'],
      },
      token: '785873aa-8bdd-4e6d-91de-2bc14e47c8f6',
    },
    {
      id: 3,
      model: 'VinFast Fadil',
      price: '589,280',
      details: {
        transmission: 'Automatic',
        baggage_capacity: 2,
        seats: 4,
        fuel_type: 'Petrol',
        year: 2020,
        safety_features: ['Airbags', 'ABS', 'Electronic Stability Control'],
      },
      token: 'e0685c35-86d4-48ae-9159-c61d2155c162',
    },
    {
      id: 4,
      model: 'Toyota Yaris',
      price: '620,000',
      details: {
        transmission: 'Automatic',
        baggage_capacity: 3,
        seats: 5,
        fuel_type: 'Petrol',
        year: 2021,
        safety_features: ['Airbags', 'ABS', 'Lane Departure Warning'],
      },
      token: '5323cb61-f9ae-4809-b1dd-23c0583e381f',
    },
    {
      id: 5,
      model: 'Mazda 3',
      price: '700,000',
      details: {
        transmission: 'Automatic',
        baggage_capacity: 2,
        seats: 5,
        fuel_type: 'Petrol',
        year: 2023,
        safety_features: ['Airbags', 'ABS', 'Blind Spot Monitoring', 'Lane Departure Warning'],
      },
      token: '51e7fd8d-3cc6-4ec9-b015-7b7ff5f17ab6',
    },
    {
      id: 6,
      model: 'Honda City',
      price: '650,000',
      details: {
        transmission: 'Automatic',
        baggage_capacity: 3,
        seats: 5,
        fuel_type: 'Petrol',
        year: 2021,
        safety_features: ['Airbags', 'ABS', 'Cruise Control'],
      },
      token: '4547f89f-8f27-470d-88c4-64293740f066',
    },
    {
      id: 7,
      model: 'Mitsubishi Xpander',
      price: '650,000',
      details: {
        transmission: 'Automatic',
        baggage_capacity: 3,
        seats: 7,
        fuel_type: 'Petrol',
        year: 2022,
        safety_features: ['Airbags', 'ABS', 'Rear Parking Sensors', 'Stability Control'],
      },
      token: '01fbdcb3-46da-4582-b21d-3b0e73177e6e',
    },
    {
      id: 8,
      model: 'Kia Cerato',
      price: '620,000',
      details: {
        transmission: 'Automatic',
        baggage_capacity: 3,
        seats: 5,
        fuel_type: 'Petrol',
        year: 2022,
        safety_features: ['Airbags', 'ABS', 'Electronic Stability Control', 'Lane Departure Warning'],
      },
      token: '9623327b-7591-4f84-b35e-4a49a757d929',
    },
  ],
  listMotors: [
    {
      id: 1,
      model: 'Yamaha Exciter 150',
      price: '1,000,000',
      details: {
        engine: '150cc',
        fuel_type: 'Petrol',
        year: 2020,
        features: ['LED Headlight', 'Sporty Design', 'Disc Brakes'],
        transmission: 'Manual',
        baggage_capacity: 10,
        seats: 2,
      },
      token: '01fbdcb3-46da-4582-b21d-3b0e73177e6e',
    },
    {
      id: 2,
      model: 'Honda Winner X',
      price: '1,200,000',
      details: {
        engine: '150cc',
        fuel_type: 'Petrol',
        year: 2021,
        features: ['ABS', 'Full Digital Display', 'LED Lights'],
        transmission: 'Manual',
        baggage_capacity: 12,
        seats: 2,
      },
      token: '01fbdcb3-46da-4582-b21d-3b0e73177e6e',
    },
    {
      id: 3,
      model: 'Suzuki Raider 150',
      price: '950,000',
      details: {
        engine: '150cc',
        fuel_type: 'Petrol',
        year: 2019,
        features: ['Underbone Frame', 'Sporty Design', 'Fuel Injection'],
        transmission: 'Manual',
        baggage_capacity: 8,
        seats: 2,
      },
      token: '01fbdcb3-46da-4582-b21d-3b0e73177e6e',
    },
    {
      id: 4,
      model: 'SYM Star SR 125',
      price: '1,100,000',
      details: {
        engine: '125cc',
        fuel_type: 'Petrol',
        year: 2022,
        features: ['Advanced Suspension', 'Fuel Injection', 'LED Lights'],
        transmission: 'Manual',
        baggage_capacity: 14,
        seats: 2,
      },
      token: '01fbdcb3-46da-4582-b21d-3b0e73177e6e',
    },
    {
      id: 5,
      model: 'Yamaha MT-15',
      price: '1,500,000',
      details: {
        engine: '155cc',
        fuel_type: 'Petrol',
        year: 2021,
        features: ['Variable Valve Actuation', 'ABS', 'LED Headlight'],
        transmission: 'Manual',
        baggage_capacity: 9,
        seats: 2,
      },
      token: '01fbdcb3-46da-4582-b21d-3b0e73177e6e',
    },
    {
      id: 6,
      model: 'Honda CBR150R',
      price: '1,800,000',
      details: {
        engine: '150cc',
        fuel_type: 'Petrol',
        year: 2020,
        features: ['Sporty Design', 'LED Headlights', 'Anti-lock Braking System'],
        transmission: 'Manual',
        baggage_capacity: 10,
        seats: 2,
      },
      token: '01fbdcb3-46da-4582-b21d-3b0e73177e6e',
    },
    {
      id: 7,
      model: 'Kawasaki Z125 Pro',
      price: '850,000',
      details: {
        engine: '125cc',
        fuel_type: 'Petrol',
        year: 2021,
        features: ['Compact Size', 'LED Lights', 'Disc Brakes'],
        transmission: 'Manual',
        baggage_capacity: 7,
        seats: 2,
      },
      token: '01fbdcb3-46da-4582-b21d-3b0e73177e6e',
    },
    {
      id: 8,
      model: 'Yamaha XSR155',
      price: '1,400,000',
      details: {
        engine: '155cc',
        fuel_type: 'Petrol',
        year: 2022,
        features: ['Retro Design', 'ABS', 'LED Headlights'],
        transmission: 'Manual',
        baggage_capacity: 11,
        seats: 2,
      },
      token: '01fbdcb3-46da-4582-b21d-3b0e73177e6e',
    },
  ],
},
};

export const fakeUser = {
name: "John Doe",
avatar: "https://example.com/path/to/avatar.jpg",
};
