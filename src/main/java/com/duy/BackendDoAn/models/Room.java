package com.duy.BackendDoAn.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price_per_day")
    private Float price_per_day;

    @Column(name = "description")
    private String description;

    @Column(name = "child_count")
    private Long child_count;

    @Column(name = "adult_count")
    private Long adult_count;

    @Column(name = "available_room")
    private Long available_room;

    @Column(name = "type_of_room")
    private String type_of_room;

    @Column(name = "type_of_bed")
    private String type_of_bed;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    @JsonBackReference
    private Hotel hotel;
}
