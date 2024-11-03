package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.BookingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRoomRepository extends JpaRepository<BookingRoom, Long> {
}
