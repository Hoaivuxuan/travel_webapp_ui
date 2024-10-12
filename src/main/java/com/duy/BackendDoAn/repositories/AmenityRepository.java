package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmenityRepository extends JpaRepository<Amenity, Long> {
}
