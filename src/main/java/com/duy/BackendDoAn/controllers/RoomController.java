package com.duy.BackendDoAn.controllers;

import com.duy.BackendDoAn.dtos.RoomDTO;
import com.duy.BackendDoAn.models.Room;
import com.duy.BackendDoAn.responses.RoomResponse;
import com.duy.BackendDoAn.services.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/rooms")
@RestController
public class RoomController {
    public final RoomService roomService;
    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomDTO roomDTO) throws Exception{
        Room newRoom = roomService.addRoom(roomDTO);
        RoomResponse roomResponse = RoomResponse.fromRoom(newRoom);
        return ResponseEntity.ok(roomResponse);
    }

//    @PostMapping("/{roomId}/amenities")
//    public ResponseEntity<>

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable long id, @Valid @RequestBody RoomDTO roomDTO) throws  Exception{
        RoomResponse roomResponse = new RoomResponse();
        Room updatedRoom = roomService.updateRoom(id, roomDTO);
        roomResponse = RoomResponse.fromRoom(updatedRoom);
        return ResponseEntity.ok(roomResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable long id) throws Exception{
        roomService.deleteRoom(id);
        return ResponseEntity.ok("Hotel ID = "+id+" deleted successfully");
    }


}
