package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
