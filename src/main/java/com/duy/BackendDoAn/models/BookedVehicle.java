package com.duy.BackendDoAn.models;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "booked_vehicle")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookedVehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rental_start_date")
    private Date rentalStartDate;

    @Column(name = "rental_end_date")
    private Date rentalEndDate;

    @Column(name = "total_vehicle_price")
    private Float totalVehiclePrice;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private BookingVehicle bookingVehicle;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
}
