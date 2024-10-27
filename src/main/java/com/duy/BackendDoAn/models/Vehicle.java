package com.duy.BackendDoAn.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(name = "vehicle")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "vehicle_type")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price_per_hour")
    private Float price_per_hour;

    @Column(name = "stake")
    private Float stake;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "description")
    private String description;

    @Column(name = "seat_amount")
    private Long seat_amount;

    @Column(name = "luggage_amount")
    private Long luggage_amount;

    @Column(name = "fuel_type")
    private String fuel_type;

    @ManyToOne
    @JoinColumn(name = "facility_id")
    private RentalFacility rentalFacility;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    @JsonManagedReference
    private List<BookingVehicle> bookingVehicles;

    @Column(name="vehicle_type", insertable = false, updatable = false)
    protected String vehicle_type;
}
