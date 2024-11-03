package com.duy.BackendDoAn.controllers;

import com.duy.BackendDoAn.dtos.TourDTO;
import com.duy.BackendDoAn.models.Tour;
import com.duy.BackendDoAn.responses.TourListResponse;
import com.duy.BackendDoAn.responses.TourResponse;
import com.duy.BackendDoAn.services.TourService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@RequestMapping("/tours")
@RestController
public class TourController {
    private TourService tourService;
    @PostMapping
    public ResponseEntity<TourResponse> createTour(@Valid @RequestBody TourDTO tourDTO) throws Exception {
        Tour tour = tourService.addTour(tourDTO);
        TourResponse tourResponse = TourResponse.fromTour(tour);
        return ResponseEntity.ok(tourResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TourResponse> updateTour(@PathVariable("id") long tourId, @Valid @RequestBody TourDTO tourDTO) throws Exception {
        Tour updatedTour = tourService.updateTour(tourId, tourDTO);
        TourResponse tourResponse = TourResponse.fromTour(updatedTour);
        return ResponseEntity.ok(tourResponse);
    }

//    @GetMapping
//    public ResponseEntity<TourListResponse> searchTour(
//            @RequestParam(defaultValue = "") String location,
//            @RequestParam String startFrom,
//            @RequestParam String endAt,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int limit
//    ) {
//        PageRequest pageRequest =PageRequest.of(
//                page, limit,
//                Sort.by("id").ascending()
//        );
//
//        DateTimeFormatter dateTimeFormatter = (DateTimeFormatter.ISO_LOCAL_DATE);
//        LocalDate start = LocalDate.parse(startFrom, dateTimeFormatter);
//        LocalDate end = LocalDate.parse(endAt, dateTimeFormatter);
//        Page<TourResponse> tourPages = tourService.getAllTours(location, start, end, pageRequest);
//        return null;
//    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteTour(@PathVariable("id") long tourId) throws Exception {
//        tourService.deleteTour(tourId);
//        return ResponseEntity.ok("Tour delete successfully");
//    }
}
