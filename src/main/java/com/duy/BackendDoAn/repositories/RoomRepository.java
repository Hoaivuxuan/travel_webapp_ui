package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
