package com.duy.BackendDoAn.repositories;

import com.duy.BackendDoAn.models.Hotel;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    @Query("SELECT DISTINCT h FROM Hotel h " +
            "JOIN h.rooms r " +
            "JOIN h.city c " +
            "WHERE (:keyword IS NULL OR c.city_name LIKE %:keyword%) " +
            "AND (:typeOfRoom IS NULL OR r.type_of_room LIKE %:typeOfRoom) " +
            "AND (:minRating IS NULL OR h.rating >= :minRating) " +
            "AND (:maxRating IS NULL OR h.rating <= :maxRating) " +
            "AND (r.id NOT IN (SELECT b.room.id FROM BookedRoom b JOIN b.bookingRoom bk WHERE bk.check_in_date <= :checkout AND bk.check_out_date >= :checkin)) " +
            "GROUP BY h " +
            "HAVING SUM(r.available_room) >= :noRooms " +
            "AND SUM(r.adult_count * r.available_room) >= :groupAdults " +
            "AND SUM(r.child_count * r.available_room) >= :groupChildren")
    Page<Hotel> searchHotels(
            @Param("keyword") String keyword,
            @Param("groupAdults") int groupAdults,
            @Param("groupChildren") int groupChildren,
            @Param("noRooms") int noRooms,
            @Param("checkin") LocalDate checkin,
            @Param("checkout") LocalDate checkout,
            @Param("typeOfRoom") String typeOfRoom,
            @Param("minRating") Float minRating,
            @Param("maxRating") Float maxRating,
            Pageable pageable);
}
