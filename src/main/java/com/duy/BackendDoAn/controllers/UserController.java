package com.duy.BackendDoAn.controllers;

import com.duy.BackendDoAn.dtos.UserDTO;
import com.duy.BackendDoAn.models.User;
import com.duy.BackendDoAn.responses.UserResponse;
import com.duy.BackendDoAn.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserDTO userDTO, BindingResult result){
        try {
            User user = userService.add(userDTO);
            return ResponseEntity.ok(UserResponse.fromUser(user));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

}
