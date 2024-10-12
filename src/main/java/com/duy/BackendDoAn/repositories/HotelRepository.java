package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
