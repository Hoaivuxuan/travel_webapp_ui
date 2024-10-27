package com.duy.BackendDoAn.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HotelDTO {
    @JsonProperty("hotel_name")
    private String hotelName;

    @JsonProperty("hotel_email")
    private String hotelEmail;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("address")
    private String address;

    @JsonProperty("longitude")
    private Float longitude;

    @JsonProperty("latitude")
    private Float latitude;

    @JsonProperty("description")
    private String description;

    @JsonProperty("rating")
    private Float rating;

    @JsonProperty("city_id")
    private Long city;

    @JsonProperty("owner_id")
    private Long owner;

    @JsonProperty("status")
    private String status;

    @JsonProperty("type_of_hotel")
    private String typeOfHotel;
}
