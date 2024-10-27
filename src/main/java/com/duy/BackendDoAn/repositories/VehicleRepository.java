package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.Vehicle;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    @Query(value = "SELECT DISTINCT v FROM Vehicle v " +
            "LEFT JOIN v.rentalFacility f " +
            "LEFT JOIN f.city c " +
            "LEFT JOIN Car car ON car.id = v.id " +
            "LEFT JOIN Motor m ON m.id = v.id " +
            "WHERE (:type IS NULL OR v.vehicle_type LIKE %:type) " +
            "AND (:location IS NULL OR c.city_name LIKE %:location) " +
            "AND v.id NOT IN (SELECT b.vehicle.id FROM BookingVehicle b " +
            "WHERE b.start_date < :endDate AND b.return_date > :startDate " +
            "AND b.start_time < :endTime AND b.return_time > :startTime)")
    Page<Vehicle> searchVehicle(
            @Param("type") String type,
            @Param("location") String location,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            Pageable pageable
    );


}
