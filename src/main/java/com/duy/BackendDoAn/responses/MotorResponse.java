package com.duy.BackendDoAn.responses;

import com.duy.BackendDoAn.models.BookingVehicle;
import com.duy.BackendDoAn.models.Motor;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MotorResponse {
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

    @JsonProperty("type_of_motor")
    private String typeOfMotor;

    @JsonProperty("handle_bar_type")
    private String handleBarType;

    @JsonProperty("fuel_type")
    private String fuelType;

    @JsonProperty("booking_vehicles")
    private List<BookingVehicle> bookingVehicles = new ArrayList<>();

    public static MotorResponse fromMotor(Motor motor){
        MotorResponse motorResponse = MotorResponse.builder()
                .id(motor.getId())
                .name(motor.getName())
                .pricePerHour(motor.getPrice_per_hour())
                .stake(motor.getStake())
                .imageUrl(motor.getImage_url())
                .description(motor.getDescription())
                .seatAmount(motor.getSeat_amount())
                .luggageAmount(motor.getLuggage_amount())
                .typeOfMotor(motor.getType_of_motor())
                .handleBarType(motor.getHandle_bar_type())
                .fuelType(motor.getFuel_type())
                .build();
        return motorResponse;
    }
}
