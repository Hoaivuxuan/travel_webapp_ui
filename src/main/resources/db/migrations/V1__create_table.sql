CREATE TABLE role(
    id INT auto_increment PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE users (
    id INT auto_increment primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    phone_number varchar(20) not null unique,
    address varchar(255),
    date_of_birth DATE not null,
    active TINYINT(1),
    username varchar(100) not null,
    password varchar(100) not null,
    role_id int,
    constraint fk_user_role foreign key (role_id) references role(id)
    on delete cascade
);


CREATE TABLE province (
    id INT AUTO_INCREMENT PRIMARY KEY,
    province_name NVARCHAR(100) NOT NULL
);

CREATE TABLE hotel_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(30)
);

CREATE TABLE hotel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_name NVARCHAR(100) NOT NULL,
    hotel_email NVARCHAR(100),
    description TEXT,
    rating FLOAT,
    province_id INT,
    owner_id INT,
    status INT,
    CONSTRAINT fk_hotel_province FOREIGN KEY (province_id) REFERENCES province(id),
    CONSTRAINT fk_hotel_owner FOREIGN KEY (owner_id) REFERENCES users(id),
    CONSTRAINT fk_hotel_status FOREIGN KEY (status) references hotel_status(id)
);

CREATE TABLE hotel_image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url NVARCHAR(255),
    hotel_id INT,
    CONSTRAINT fk_hotel_image_hotel FOREIGN KEY (hotel_id) REFERENCES hotel(id)
);

CREATE TABLE type_of_room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(30)
);

CREATE TABLE status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(30)
);

CREATE TABLE room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_number NVARCHAR(10),
    price_per_night FLOAT,
    description TEXT,
    hotel_id INT,
    type_of_room INT,
    status INT,
    CONSTRAINT fk_room_hotel FOREIGN KEY (hotel_id) references hotel(id),
    CONSTRAINT fk_room_type_of_room FOREIGN KEY (type_of_room) references type_of_room(id),
    CONSTRAINT fk_room_status FOREIGN KEY (status) references status(id)
);

create table amenity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(255)
);

create table amenity_for_room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amenity_id INT,
    room_id INT,
    CONSTRAINT fk_amenity_for_room_amenity FOREIGN KEY (amenity_id) REFERENCES amenity(id),
    CONSTRAINT fk_amenity_for_room_room FOREIGN KEY (room_id) REFERENCES room(id)
);

CREATE TABLE booking_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(30)
);

CREATE TABLE booking_room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_date DATE,
    total_price FLOAT,
    status INT,
    user_id INT,
    CONSTRAINT fk_booking_room_status foreign key (status) references booking_status(id),
    CONSTRAINT fk_booking_room_users foreign key (user_id) references users(id)
);

CREATE TABLE booked_room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    check_in_date DATE,
    check_out_date DATE,
    amount FLOAT,
    booking_room_id INT,
    room_id INT,
    CONSTRAINT fk_booked_room_booking_room foreign key (booking_room_id) references booking_room(id),
    CONSTRAINT fk_booked_room_room foreign key (room_id) references room(id)
);

create table service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(255)
);

CREATE TABLE vehicle_rental_facility (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    phone_number NVARCHAR(20),
    email NVARCHAR(100),
    description TEXT,
    province_id INT,
    owner_id INT,
    CONSTRAINT fk_vehicle_rental_facility_province FOREIGN KEY (province_id) REFERENCES province(id),
    CONSTRAINT fk_vehicle_rental_facility_owner FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(30),
    price_per_day FLOAT,
    vehicle_number NVARCHAR(20),
    description TEXT,
    status INT,
    facility_id INT,
    CONSTRAINT fk_vehicle_status foreign key (status) references status(id),
    CONSTRAINT fk_vehicle_vehicle_rental_facility foreign key (facility_id) references vehicle_rental_facility(id)
);

CREATE TABLE vehicle_image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url NVARCHAR(255),
    vehicle_id INT,
    CONSTRAINT fk_vehicle_image_vehicle foreign key (vehicle_id) references vehicle(id)
);

CREATE TABLE vehicle_service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    service_id INT,
    CONSTRAINT fk_vehicle_service_vehicle foreign key (vehicle_id) references vehicle(id),
    CONSTRAINT fk_vehicle_service_service foreign key (service_id) references service(id)
);

CREATE TABLE booking_vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_date DATE,
    total_price FLOAT,
    user_id INT,
    CONSTRAINT fk_booking_vehicle_users foreign key (user_id) references users(id)
);

CREATE TABLE booked_vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rental_start_date DATE,
    rental_end_date DATE,
    total_vehicle_price FLOAT,
    booking_id INT,
    vehicle_id INT,
    CONSTRAINT fk_booked_vehicle_booking_vehicle foreign key (booking_id) references booking_vehicle(id),
    CONSTRAINT fk_booked_vehicle_vehicle foreign key (vehicle_id) references vehicle(id)
);

