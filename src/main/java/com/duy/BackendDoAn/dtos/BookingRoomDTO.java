package com.duy.BackendDoAn.dtos;

import com.duy.BackendDoAn.models.BookedRoom;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingRoomDTO {
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

    @JsonProperty("status")
    private String status;

    @JsonProperty("booked_rooms")
    private List<BookedRoomDTO> bookedRooms;
}
