package com.duy.BackendDoAn.services;

import com.duy.BackendDoAn.dtos.RoomDTO;
import com.duy.BackendDoAn.models.Hotel;
import com.duy.BackendDoAn.models.Room;
import com.duy.BackendDoAn.repositories.HotelRepository;
import com.duy.BackendDoAn.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService {
    public final HotelRepository hotelRepository;
    public final RoomRepository roomRepository;
    public Room addRoom(RoomDTO roomDTO) throws Exception{
        Hotel hotel = hotelRepository.findById(roomDTO.getHotel()).orElseThrow(() -> new Exception("Hotel ID not found"));
        Room newRoom = Room.builder()
                .price_per_day(roomDTO.getPricePerDay())
                .description(roomDTO.getDescription())
                .child_count(roomDTO.getChildCount())
                .adult_count(roomDTO.getAdultCount())
                .available_room(roomDTO.getAvailableRoom())
                .type_of_room(roomDTO.getTypeOfRoom())
                .type_of_bed(roomDTO.getTypeOfBed())
                .hotel(hotel)
                .build();
        return roomRepository.save(newRoom);
    }

    public Room getRoomById(long id) throws Exception{
        return roomRepository.findById(id).orElseThrow(() -> new Exception("Can't find room with ID = "+id));
    }

    public Room updateRoom(Long id, RoomDTO roomDTO) throws Exception{
        Room existingRoom = getRoomById(id);
        if(existingRoom != null){
            Hotel existingHotel = hotelRepository.findById(roomDTO.getHotel()).orElseThrow(() -> new Exception("Can't find hotel"));
            existingRoom.setHotel(existingHotel);
            if(roomDTO.getPricePerDay() >= 0){
                existingRoom.setPrice_per_day(roomDTO.getPricePerDay());
            }
            if (roomDTO.getDescription() != null && !roomDTO.getDescription().isEmpty()){
                existingRoom.setDescription(roomDTO.getDescription());
            }
            if(roomDTO.getChildCount() >= 0){
                existingRoom.setChild_count(roomDTO.getChildCount());
            }
            if(roomDTO.getAdultCount() >= 1){
                existingRoom.setAdult_count(roomDTO.getAdultCount());
            }
            if(roomDTO.getAvailableRoom() >= 0){
                existingRoom.setAvailable_room(roomDTO.getAvailableRoom());
            }
            if(roomDTO.getTypeOfRoom() != null && !roomDTO.getTypeOfRoom().isEmpty()){
                existingRoom.setType_of_room(existingRoom.getType_of_room());
            }
            if (roomDTO.getTypeOfBed() != null && !roomDTO.getTypeOfBed().isEmpty()){
                existingRoom.setType_of_bed(existingRoom.getType_of_bed());
            }
            return roomRepository.save(existingRoom);
        }
        return null;
    }

    public void deleteRoom(long id){
        Optional<Room> optionalRoom = roomRepository.findById(id);
        optionalRoom.ifPresent(roomRepository::delete);
    }
}
