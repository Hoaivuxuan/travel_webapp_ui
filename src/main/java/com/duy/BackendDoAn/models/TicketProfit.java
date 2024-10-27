package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ticket_profit")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TicketProfit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profit_id")
    private Profit profit;

    @ManyToOne
    @JoinColumn(name = "ticket_class_id")
    private TicketClass ticketClass;
}
