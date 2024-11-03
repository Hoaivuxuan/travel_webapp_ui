package com.duy.BackendDoAn.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookedRoomDTO {
    @JsonProperty("amount")
    private Long amount;

    @JsonProperty("price_per")
    private Float pricePer;

    @JsonProperty("room_id")
    private Long room;

    @JsonProperty("booking_room_id")
    private Long bookingRoom;
}
