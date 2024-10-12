package com.duy.BackendDoAn.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hotel_status")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HotelStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    public static String ACCEPTED = "ACCEPTED";
    public static String REFUSED = "REFUSED";
    public static String WAITING = "WAITING";
}
