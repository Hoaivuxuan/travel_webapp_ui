package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookedRoomRepository extends JpaRepository<BookedRoom, Long> {
}
