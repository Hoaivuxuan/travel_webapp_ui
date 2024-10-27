package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rental_facility")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RentalFacility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone_number")
    private String phone_number;

    @Column(name = "email")
    private String email;

    @Column(name = "description")
    private String description;

    @Column(name = "address")
    private String address;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
