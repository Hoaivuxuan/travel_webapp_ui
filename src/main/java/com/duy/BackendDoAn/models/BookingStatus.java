package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_status")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    public static String PAYED = "PAYED";
    public static String WAIT = "WAIT";
}
