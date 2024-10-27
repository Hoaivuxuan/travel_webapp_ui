package com.duy.BackendDoAn.controllers;

import com.duy.BackendDoAn.dtos.CarDTO;
import com.duy.BackendDoAn.dtos.MotorDTO;
import com.duy.BackendDoAn.models.Car;
import com.duy.BackendDoAn.models.Motor;
import com.duy.BackendDoAn.models.Vehicle;
import com.duy.BackendDoAn.responses.*;
import com.duy.BackendDoAn.services.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/vehicles")
@RestController
public class VehicleController {
    private final VehicleService vehicleService;

    @PostMapping("/cars")
    public ResponseEntity<CarResponse> createCar(@Valid @RequestBody CarDTO carDTO) throws Exception {
        Car newCar = vehicleService.addCar(carDTO);
        CarResponse carResponse = CarResponse.fromCar(newCar);
        return ResponseEntity.ok(carResponse);
    }

    @PostMapping("/motors")
    public ResponseEntity<MotorResponse> createMotor(@Valid @RequestBody MotorDTO motorDTO) throws Exception {
        Motor newMotor = vehicleService.addMotor(motorDTO);
        MotorResponse motorResponse = MotorResponse.fromMotor(newMotor);
        return ResponseEntity.ok(motorResponse);
    }

    @GetMapping("")
    public ResponseEntity<VehicleListResponse> searchCar(
            @RequestParam(defaultValue = "") String type,
            @RequestParam(defaultValue = "") String location,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String startTime,
            @RequestParam String endTime,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        PageRequest pageRequest = PageRequest.of(
                page, limit,
                Sort.by("id").ascending()
        );

        DateTimeFormatter dateFormat = (DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate start_date = LocalDate.parse(startDate, dateFormat);
        LocalDate end_date = LocalDate.parse(endDate, dateFormat);

        DateTimeFormatter timeFormatter = (DateTimeFormatter.ofPattern("HH:mm"));
        LocalTime start_time = LocalTime.parse(startTime, timeFormatter);
        LocalTime end_time = LocalTime.parse(endTime, timeFormatter);

        Page<VehicleResponse> carPage = vehicleService.getAllVehicle(type, location, start_date, end_date, start_time, end_time, pageRequest);
        int totalPages = carPage.getTotalPages();
        List<VehicleResponse> vehicles = carPage.getContent();
        return ResponseEntity.ok(VehicleListResponse.builder()
                .vehicles(vehicles)
                .totalPages(totalPages)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVehicleById(@PathVariable("id") Long id) throws Exception {
        Object specificVehicle = vehicleService.getSpecificVehicleById(id);
        return ResponseEntity.ok(specificVehicle);
    }

    @PutMapping("/cars/{id}")
    public ResponseEntity<CarResponse> updateCarById( @PathVariable("id") Long id, @Valid @RequestBody CarDTO carDTO) throws Exception {
        CarResponse carResponse = new CarResponse();
        Car car = vehicleService.updateCar(id, carDTO);
        carResponse = CarResponse.fromCar(car);
        return ResponseEntity.ok(carResponse);
    }

    @PutMapping("/motors/{id}")
    public ResponseEntity<MotorResponse> updateMotorById( @PathVariable("id") Long id, @Valid @RequestBody MotorDTO motorDTO) throws Exception {
        MotorResponse motorResponse = new MotorResponse();
        Motor motor = vehicleService.updateMotor(id, motorDTO);
        motorResponse = MotorResponse.fromMotor(motor);
        return ResponseEntity.ok(motorResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable Long id) throws Exception {
        vehicleService.deleteVehicleById(id);
        return ResponseEntity.ok("Vehicle delete successfully");
    }
}
