package com.duy.BackendDoAn.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "type_of_room")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TypeOfRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    public static String SINGLE = "SINGLE";
    public static String DOUBLE = "DOUBLE";
    public static String TWIN = "TWIN";
    public static String SUITE = "SUITE";
}
