package com.duy.BackendDoAn.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoomDTO {
    @JsonProperty("price_per_day")
    private Float pricePerDay;

    @JsonProperty("description")
    private String description;

    @JsonProperty("child_count")
    private Long childCount;

    @JsonProperty("adult_count")
    private Long adultCount;

    @JsonProperty("available_room")
    private Long availableRoom;

    @JsonProperty("type_of_room")
    private String typeOfRoom;

    @JsonProperty("type_of_bed")
    private String typeOfBed;

    @JsonProperty("hotel_id")
    private Long hotel;
}
