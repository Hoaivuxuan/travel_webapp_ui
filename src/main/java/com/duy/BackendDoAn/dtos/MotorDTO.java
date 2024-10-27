package com.duy.BackendDoAn.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MotorDTO extends VehicleDTO{
    @JsonProperty("type_of_motor")
    private String typeOfMotor;

    @JsonProperty("handle_bar_type")
    private String handleBarType;

}
