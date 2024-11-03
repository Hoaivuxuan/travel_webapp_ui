package com.duy.BackendDoAn.responses;

import com.duy.BackendDoAn.models.BookedRoom;
import com.duy.BackendDoAn.models.BookingRoom;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingRoomResponse {
    private Long id;

    @JsonProperty("booking_date")
    private LocalDate bookingDate;

    @JsonProperty("check_in_date")
    private LocalDate checkInDate;

    @JsonProperty("check_out_date")
    private LocalDate checkOutDate;

    @JsonProperty("total_price")
    private Float totalPrice;

    @JsonProperty("user_id")
    private Long user;

    @JsonProperty("booked_rooms")
    private List<BookedRoom> bookedRooms;

    public static BookingRoomResponse fromBookingRoom(BookingRoom bookingRoom){
        BookingRoomResponse bookingRoomResponse = BookingRoomResponse.builder()
                .id(bookingRoom.getId())
                .bookingDate(bookingRoom.getBooking_date())
                .checkInDate(bookingRoom.getCheck_in_date())
                .checkOutDate(bookingRoom.getCheck_out_date())
                .totalPrice(bookingRoom.getTotal_price())
                .user(bookingRoom.getUser().getId())
                .bookedRooms(bookingRoom.getBookedRooms())
                .build();
        return bookingRoomResponse;
    }
}
