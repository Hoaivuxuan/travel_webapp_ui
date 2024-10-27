package com.duy.BackendDoAn.responses;

import com.duy.BackendDoAn.models.Hotel;
import com.duy.BackendDoAn.models.HotelImage;
import com.duy.BackendDoAn.models.Room;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HotelResponse {
    private Long id;

    @JsonProperty("hotel_name")
    private String hotelName;

    @JsonProperty("hotel_email")
    private String hotelEmail;

    private String description;

    @JsonProperty("longitude")
    private Float longitude;

    @JsonProperty("latitude")
    private Float latitude;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("address")
    private String address;

    private Float rating;

    @JsonProperty("status")
    private String status;

    @JsonProperty("city_id")
    private Long city;

    @JsonProperty("owner_id")
    private Long owner;

    @JsonProperty("type_of_hotel")
    private String typeOfHotel;

    @JsonProperty("hotel_images")
    private List<HotelImage> hotelImages = new ArrayList<>();

    @JsonProperty("rooms")
    private List<Room> rooms = new ArrayList<>();

    public static HotelResponse fromHotel(Hotel hotel){
        HotelResponse hotelResponse = HotelResponse.builder()
                .id(hotel.getId())
                .hotelName(hotel.getHotelName())
                .hotelEmail(hotel.getHotelEmail())
                .description(hotel.getDescription())
                .longitude(hotel.getLongitude())
                .latitude(hotel.getLatitude())
                .phoneNumber(hotel.getPhone_number())
                .address(hotel.getAddress())
                .rating(hotel.getRating())
                .status(hotel.getHotelStatus())
                .city(hotel.getCity().getId())
                .owner(hotel.getOwner().getId())
                .typeOfHotel(hotel.getType_of_hotel())
                .hotelImages(hotel.getHotelImages())
                .rooms(hotel.getRooms())
                .build();
        return hotelResponse;
    }
}
