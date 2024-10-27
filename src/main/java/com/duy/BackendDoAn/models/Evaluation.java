package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "evaluation")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rating")
    private Long rating;

    @Column(name = "comment")
    private String comment;

    @Column(name = "evaluation_date")
    private LocalDate evaluation_date;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
