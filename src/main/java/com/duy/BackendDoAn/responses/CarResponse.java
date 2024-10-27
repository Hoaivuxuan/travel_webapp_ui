package com.duy.BackendDoAn.responses;

import com.duy.BackendDoAn.models.BookingVehicle;
import com.duy.BackendDoAn.models.Car;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CarResponse {
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

    @JsonProperty("facility_id")
    private Long facility;

    @JsonProperty("transmission_type")
    private String transmissionType;

    @JsonProperty("trunkCapacity")
    private Float trunkCapacity;

    @JsonProperty("fuel_type")
    private String fuelType;

    @JsonProperty("booking_vehicles")
    private List<BookingVehicle> bookingVehicles = new ArrayList<>();

    public static CarResponse fromCar(Car car) {
        CarResponse carResponse = CarResponse.builder()
                .id(car.getId())
                .name(car.getName())
                .pricePerHour(car.getPrice_per_hour())
                .stake(car.getStake())
                .imageUrl(car.getImage_url())
                .description(car.getDescription())
                .seatAmount(car.getSeat_amount())
                .luggageAmount(car.getLuggage_amount())
                .facility(car.getRentalFacility().getId())
                .transmissionType(car.getTransmission_type())
                .trunkCapacity(car.getTrunk_capacity())
                .fuelType(car.getFuel_type())
                .build();
        return carResponse;
    }

}
