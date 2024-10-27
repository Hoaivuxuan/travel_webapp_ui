package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "car")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "car_id")
@SuperBuilder
@DiscriminatorValue("CAR")
public class Car extends Vehicle{
    @Column(name = "transmission_type")
    private String transmission_type;

    @Column(name = "trunk_capacity")
    private Float trunk_capacity;
}
