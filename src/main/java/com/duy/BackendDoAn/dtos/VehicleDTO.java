package com.duy.BackendDoAn.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VehicleDTO {
    @JsonProperty("name")
    private String name;

    @JsonProperty("price_per_hour")
    private Float pricePerHour;

    @JsonProperty("stake")
    private Float stake;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("description")
    private String description;

    @JsonProperty("seat_amount")
    private Long seatAmount;

    @JsonProperty("luggage_amount")
    private Long luggageAmount;

    @JsonProperty("fuel_type")
    private String fuelType;

    @JsonProperty("facility_id")
    private Long facility;

}
