package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

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

    @Column(name = "room_number", length = 10)
    private String roomNumber;

    @Column(name = "price_per_night")
    private Float pricePerNight;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "type_of_room")
    private TypeOfRoom typeOfRoom;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @ManyToOne
    @JoinColumn(name = "status")
    private Status status;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookedRoom> bookedRooms;
}
