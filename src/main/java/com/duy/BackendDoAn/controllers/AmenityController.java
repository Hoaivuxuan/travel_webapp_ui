package com.duy.BackendDoAn.controllers;

import com.duy.BackendDoAn.models.Amenity;
import com.duy.BackendDoAn.services.AmenityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/amenities")
@RestController
public class AmenityController {
    private final AmenityService amenityService;
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllAmenities() {
        List<Amenity> amenities = amenityService.getAllAmenities();
        return ResponseEntity.ok(amenities);
    }
}
