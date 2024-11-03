package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface TourRepository extends JpaRepository<Tour, Long> {
//    @Query()
//    Page<Tour> searchTours(
//            @Param("location") String location,
//            @Param("startFrom") LocalDate startFrom,
//            @Param("endAt") LocalDate endAt,
//            Pageable pageable
//            );
}
