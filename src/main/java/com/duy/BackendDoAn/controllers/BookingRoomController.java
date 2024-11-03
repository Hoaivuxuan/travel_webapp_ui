package com.duy.BackendDoAn.controllers;

import com.duy.BackendDoAn.dtos.BookingRoomDTO;
import com.duy.BackendDoAn.models.BookingRoom;
import com.duy.BackendDoAn.responses.BookingRoomResponse;
import com.duy.BackendDoAn.services.BookingRoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/bookingRoom")
@RestController
public class BookingRoomController {
    private final BookingRoomService bookingRoomService;
    @PostMapping
    public ResponseEntity<BookingRoomResponse> createBooking(@Valid @RequestBody BookingRoomDTO bookingRoomDTO) throws Exception {
        BookingRoom bookingRoom = bookingRoomService.createBooking(bookingRoomDTO);
        BookingRoomResponse bookingRoomResponse = BookingRoomResponse.fromBookingRoom(bookingRoom);
        return ResponseEntity.ok(bookingRoomResponse);
    }


}
