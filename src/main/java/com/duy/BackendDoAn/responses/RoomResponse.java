package com.duy.BackendDoAn.responses;

import com.duy.BackendDoAn.models.AmenityForRoom;
import com.duy.BackendDoAn.models.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomResponse {
    private Long id;

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

    @JsonProperty("hotel_id")
    private Long hotel;

    @JsonProperty("type_of_bed")
    private String typeOfBed;

    @JsonProperty("amenity_for_room")
    private List<AmenityForRoom> amenityForRoom = new ArrayList<>();

    @JsonProperty("booked_room")
    private List<BookedRoom> bookedRooms = new ArrayList<>();

    public static RoomResponse fromRoom(Room room){
        RoomResponse roomResponse = RoomResponse.builder()
                .id(room.getId())
                .pricePerDay(room.getPrice_per_day())
                .description(room.getDescription())
                .childCount(room.getChild_count())
                .adultCount(room.getAdult_count())
                .availableRoom(room.getAvailable_room())
                .typeOfRoom(room.getType_of_room())
                .hotel(room.getHotel().getId())
                .typeOfBed(room.getType_of_bed())
                .build();
        return roomResponse;
    }
}
