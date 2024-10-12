package com.duy.BackendDoAn.models;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "booking_room")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_date")
    private Date booking_date;

    @Column(name = "total_price")
    private Float totalPrice;

    @OneToMany(mappedBy = "bookingRoom", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookedRoom> bookedRooms;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
