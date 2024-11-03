package com.duy.BackendDoAn.services;

import com.duy.BackendDoAn.dtos.BookedRoomDTO;
import com.duy.BackendDoAn.models.BookedRoom;
import com.duy.BackendDoAn.models.BookingRoom;
import com.duy.BackendDoAn.models.Room;
import com.duy.BackendDoAn.repositories.BookedRoomRepository;
import com.duy.BackendDoAn.repositories.BookingRoomRepository;
import com.duy.BackendDoAn.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookedRoomService {

    public  final RoomRepository roomRepository;
    public final BookingRoomRepository bookingRoomRepository;
    public final BookedRoomRepository bookedRoomRepository;

    public BookedRoom createBookedRoom(BookedRoomDTO bookedRoomDTO) throws Exception {
        Room room = roomRepository.findById(bookedRoomDTO.getRoom()).orElseThrow(() -> new Exception("Room not found"));
        BookingRoom bookingRoom = bookingRoomRepository.findById(bookedRoomDTO.getBookingRoom()).orElseThrow(()-> new Exception("Booking nor found"));
        BookedRoom bookedRoom = BookedRoom.builder()
                .amount(bookedRoomDTO.getAmount())
                .price_per(bookedRoomDTO.getPricePer())
                .room(room)
                .bookingRoom(bookingRoom)
                .build();
        return bookedRoomRepository.save(bookedRoom);
    }


}
