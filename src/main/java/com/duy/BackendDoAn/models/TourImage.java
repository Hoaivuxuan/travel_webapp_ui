package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tour_image")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url")
    private String image_url;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;
}
