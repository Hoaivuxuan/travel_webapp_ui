package com.duy.BackendDoAn.models;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Table(name = "hotel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hotel_name", length = 100)
    private String hotelName;

    @Column(name = "hotel_email", length = 100)
    private String hotelEmail;

    @Column(name = "description")
    private String description;

    @Column(name = "rating")
    private Float rating;

    @ManyToOne
    @JoinColumn(name = "status")
    private HotelStatus hotelStatus;

    @ManyToOne
    @JoinColumn(name = "province_id")
    private Province province;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HotelImage> hotelImage;
}
