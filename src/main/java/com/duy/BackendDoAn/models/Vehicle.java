package com.duy.BackendDoAn.models;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "vehicle")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price_per_day")
    private Float pricePerDay;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "status")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "facility_id")
    private VehicleRentalFacility vehicleRentalFacility;
}
