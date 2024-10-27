package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
