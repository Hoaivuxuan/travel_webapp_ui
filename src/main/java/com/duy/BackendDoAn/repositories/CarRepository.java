package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {
}
