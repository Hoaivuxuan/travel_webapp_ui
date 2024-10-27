package com.duy.BackendDoAn.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hotel_image")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HotelImage {
    public static final int MAX_IMAGES_PER_HOTEL = 5;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    @JsonBackReference
    private Hotel hotel;

    @Column(name = "image_url", length = 300)
    private String image_url;
}
