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
public class CarDTO extends VehicleDTO {
    @JsonProperty("transmission_type")
    private String transmissionType;

    @JsonProperty("trunk_capacity")
    private Float trunkCapacity;

}
