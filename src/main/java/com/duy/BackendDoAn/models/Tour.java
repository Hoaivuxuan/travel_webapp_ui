package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "tour")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "start_time")
    private LocalTime start_time;

    @Column(name = "end_time")
    private LocalTime end_time;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
}
