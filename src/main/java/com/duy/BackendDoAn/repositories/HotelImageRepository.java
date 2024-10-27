package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.HotelImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelImageRepository extends JpaRepository<HotelImage, Long> {
    List<HotelImage> findByHotelId(Long id);
    int countByHotelId(Long hotelId);
}
