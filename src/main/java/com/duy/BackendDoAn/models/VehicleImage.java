package com.duy.BackendDoAn.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehicle_image")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VehicleImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @Column(name = "image_url", length = 300)
    private String imageUrl;
}
