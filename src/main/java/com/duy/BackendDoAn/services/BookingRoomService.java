package com.duy.BackendDoAn.services;

import com.duy.BackendDoAn.dtos.BookedRoomDTO;
import com.duy.BackendDoAn.dtos.BookingRoomDTO;
import com.duy.BackendDoAn.models.BookedRoom;
import com.duy.BackendDoAn.models.BookingRoom;
import com.duy.BackendDoAn.models.User;
import com.duy.BackendDoAn.models.Room;
import com.duy.BackendDoAn.repositories.BookedRoomRepository;
import com.duy.BackendDoAn.repositories.BookingRoomRepository;
import com.duy.BackendDoAn.repositories.RoomRepository;
import com.duy.BackendDoAn.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingRoomService {
    private final UserRepository userRepository;
    private final BookingRoomRepository bookingRoomRepository;
    private final RoomRepository roomRepository;
    private final BookedRoomRepository bookedRoomRepository;
    public BookingRoom createBooking (BookingRoomDTO bookingRoomDTO) throws Exception {
        User user = userRepository.findById(bookingRoomDTO.getUser()).orElseThrow(()-> new Exception("User not found"));
        BookingRoom newBookingRoom = BookingRoom.builder()
                .booking_date(LocalDate.now())
                .check_in_date(bookingRoomDTO.getCheckInDate())
                .check_out_date(bookingRoomDTO.getCheckOutDate())
                .total_price(bookingRoomDTO.getTotalPrice())
                .status(bookingRoomDTO.getStatus())
                .user(user)
                .build();
        bookingRoomRepository.save(newBookingRoom);
        List<BookedRoom> instanceBookedRoom = new ArrayList<>();
        for (BookedRoomDTO bookedRoomDTO : bookingRoomDTO.getBookedRooms()){
            Room room = roomRepository.findById(bookedRoomDTO.getRoom()).orElseThrow(()-> new Exception("Room not found"));
            BookedRoom bookedRoom = BookedRoom.builder()
                    .amount(bookedRoomDTO.getAmount())
                    .price_per(bookedRoomDTO.getPricePer())
                    .room(room)
                    .bookingRoom(newBookingRoom)
                    .build();
            instanceBookedRoom.add(bookedRoom);
            bookedRoomRepository.save(bookedRoom);
        }
        newBookingRoom.setBookedRooms(instanceBookedRoom);
        return newBookingRoom;
    }
}
