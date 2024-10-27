package com.duy.BackendDoAn.responses;

import com.duy.BackendDoAn.models.Vehicle;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VehicleResponse {
    private Long id;

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

    public static VehicleResponse fromVehicle(Vehicle vehicle) {
        VehicleResponse vehicleResponse = VehicleResponse.builder()
                .id(vehicle.getId())
                .name(vehicle.getName())
                .pricePerHour(vehicle.getPrice_per_hour())
                .stake(vehicle.getStake())
                .imageUrl(vehicle.getImage_url())
                .description(vehicle.getDescription())
                .seatAmount(vehicle.getSeat_amount())
                .luggageAmount(vehicle.getLuggage_amount())
                .fuelType(vehicle.getFuel_type())
                .facility(vehicle.getRentalFacility().getId())
                .build();
        return vehicleResponse;
    }
}
