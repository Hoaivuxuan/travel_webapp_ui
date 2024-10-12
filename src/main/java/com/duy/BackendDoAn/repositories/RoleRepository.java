package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
