
INSERT INTO hotel (hotel_name, hotel_email, phone_number, address, longitude, latitude, description, rating, city_id, owner_id, status, type_of_hotel)
VALUES
('Hotel Sunshine', 'sunshine@example.com', '0123456789', '123 Beach Ave', 106.6297, 10.8231, 'A sunny place by the beach.', 4.5, 1, 2, 'ACCEPTED', 'Resort'),
('Mountain Retreat', 'retreat@example.com', '0987654321', '456 Mountain Rd', 105.7820, 21.0285, 'Peaceful mountain retreat.', 4.7, 2, 3, 'ACCEPTED', 'Hotel'),
('City Lights Inn', 'citylights@example.com', '0765432109', '789 City St', 108.2200, 16.0544, 'Stay in the heart of the city.', 4.3, 3, 4, 'ACCEPTED', 'Inn'),
('Desert Mirage', 'mirage@example.com', '0123456780', '101 Desert Dr', 103.8510, 1.2902, 'Luxury in the desert.', 4.6, 4, 5, 'ACCEPTED', 'Resort'),
('Forest Haven', 'haven@example.com', '0998765432', '102 Forest Ln', 105.8440, 21.0245, 'Nature\'s embrace.', 4.8, 5, 6, 'ACCEPTED', 'Lodge'),
('Lakeside Lodge', 'lakeside@example.com', '0976543210', '103 Lakeview Blvd', 107.6290, 10.7626, 'Relax by the lake.', 4.4, 6, 7, 'ACCEPTED', 'Lodge');

INSERT INTO room (price_per_day, description, child_count, adult_count, available_room, hotel_id, type_of_room, type_of_bed)
VALUES
(100.00, 'Phòng tiêu chuẩn', 2, 2, 5, 1, 1, 1),
(150.00, 'Phòng deluxe', 2, 3, 3, 1, 2, 2),
(200.00, 'Phòng suite', 3, 4, 2, 1, 3, 3),
(100.00, 'Phòng tiêu chuẩn', 2, 2, 5, 2, 1, 1),
(150.00, 'Phòng deluxe', 2, 3, 3, 2, 2, 2),
(200.00, 'Phòng suite', 3, 4, 2, 2, 3, 3),
(100.00, 'Phòng tiêu chuẩn', 2, 2, 5, 3, 1, 1),
(150.00, 'Phòng deluxe', 2, 3, 3, 3, 2, 2),
(200.00, 'Phòng suite', 3, 4, 2, 3, 3, 3),
(100.00, 'Phòng tiêu chuẩn', 2, 2, 5, 4, 1, 1),
(150.00, 'Phòng deluxe', 2, 3, 3, 4, 2, 2),
(200.00, 'Phòng suite', 3, 4, 2, 4, 3, 3),
(100.00, 'Phòng tiêu chuẩn', 2, 2, 5, 5, 1, 1),
(150.00, 'Phòng deluxe', 2, 3, 3, 5, 2, 2),
(200.00, 'Phòng suite', 3, 4, 2, 5, 3, 3),
(100.00, 'Phòng tiêu chuẩn', 2, 2, 5, 6, 1, 1),
(150.00, 'Phòng deluxe', 2, 3, 3, 6, 2, 2),
(200.00, 'Phòng suite', 3, 4, 2, 6, 3, 3);

INSERT INTO booking_room (booking_date, check_in_date, check_out_date, total_price, status, user_id)
VALUES
('2024-10-01', '2024-10-05', '2024-10-10', 500.00, 'confirmed', 1),
('2024-10-02', '2024-10-06', '2024-10-11', 600.00, 'confirmed', 2),
('2024-10-03', '2024-10-07', '2024-10-12', 700.00, 'confirmed', 3),
('2024-10-04', '2024-10-08', '2024-10-13', 800.00, 'confirmed', 4),
('2024-10-05', '2024-10-09', '2024-10-14', 900.00, 'confirmed', 5),
('2024-10-06', '2024-10-10', '2024-10-15', 1000.00, 'confirmed', 6),
('2024-10-07', '2024-10-11', '2024-10-16', 1100.00, 'confirmed', 7),
('2024-10-08', '2024-10-12', '2024-10-17', 1200.00, 'confirmed', 1),
('2024-10-09', '2024-10-13', '2024-10-18', 1300.00, 'confirmed', 2),
('2024-10-10', '2024-10-14', '2024-10-19', 1400.00, 'confirmed', 3),
('2024-10-11', '2024-10-15', '2024-10-20', 1500.00, 'confirmed', 4),
('2024-10-12', '2024-10-16', '2024-10-21', 1600.00, 'confirmed', 5),
('2024-10-13', '2024-10-17', '2024-10-22', 1700.00, 'confirmed', 6),
('2024-10-14', '2024-10-18', '2024-10-23', 1800.00, 'confirmed', 7);


INSERT INTO booked_room (amount, price_per, room_id, booking_room_id)
VALUES
(2, 150.00, 1, 1),
(3, 200.00, 2, 2),
(1, 180.00, 3, 3),
(4, 220.00, 4, 4),
(2, 170.00, 5, 5),
(3, 250.00, 6, 6),
(1, 140.00, 7, 7),
(2, 160.00, 8, 8),
(3, 190.00, 9, 9),
(2, 210.00, 10, 10),
(4, 230.00, 11, 11),
(2, 200.00, 12, 12),
(1, 150.00, 13, 13),
(3, 240.00, 14, 14),
(1, 150.00, 15, 1),
(4, 230.00, 16, 2),
(2, 180.00, 17, 3);

INSERT INTO rental_facility (name, phone_number, email, description, address, city_id, owner_id)
VALUES
('Main Street Facility', '0123456789', 'main.street@example.com', 'Cozy facility in the heart of the city.', '123 Main St', 1, 1),
('Beachside Retreat', '0987654321', 'beachside@example.com', 'Relaxing beachside retreat.', '456 Ocean Dr', 2, 2),
('Mountain Escape', '0765432109', 'mountain.escape@example.com', 'Scenic mountain escape.', '789 Mountain Rd', 3, 3),
('City Center Hub', '0123456780', 'city.center@example.com', 'Convenient city center location.', '101 Central Ave', 4, 4),
('Countryside Villa', '0998765432', 'countryside.villa@example.com', 'Charming countryside villa.', '202 Country Ln', 5, 5),
('Lakeside Lodge', '0976543210', 'lakeside.lodge@example.com', 'Peaceful lakeside lodge.', '303 Lakeview Blvd', 6, 6);







