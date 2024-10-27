package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ticket_class")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TicketClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "available_ticket")
    private Long available_ticket;

    @Column(name = "adult_price")
    private Float adult_price;

    @Column(name = "children_price")
    private Float children_price;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;
}
