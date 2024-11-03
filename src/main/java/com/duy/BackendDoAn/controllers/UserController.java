package com.duy.BackendDoAn.controllers;

import com.duy.BackendDoAn.dtos.UserDTO;
import com.duy.BackendDoAn.dtos.UserLoginDTO;
import com.duy.BackendDoAn.dtos.UserRegisterDTO;
import com.duy.BackendDoAn.models.User;
import com.duy.BackendDoAn.responses.LoginResponse;
import com.duy.BackendDoAn.responses.RegisterResponse;
import com.duy.BackendDoAn.responses.UserResponse;
import com.duy.BackendDoAn.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody UserRegisterDTO userRegisterDTO, BindingResult result){
        RegisterResponse registerResponse = new RegisterResponse();
        if(result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            registerResponse.setMessage(errorMessages.toString());
            return ResponseEntity.badRequest().body(registerResponse);
        }

        try {
            User user = userService.add(userRegisterDTO);
            registerResponse.setMessage("Register Successfully");
            registerResponse.setUser(user);
            return ResponseEntity.ok(registerResponse);
        } catch (Exception e) {
            registerResponse.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(registerResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody UserLoginDTO userLoginDTO){
        LoginResponse loginResponse = new LoginResponse();
        try {
            String token  = userService.login(userLoginDTO.getEmail(), userLoginDTO.getPassword());
            loginResponse.setToken(token);
            loginResponse.setMessage("Login successfully");
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            loginResponse.setMessage("Login failed");
            return ResponseEntity.badRequest().body(loginResponse);
        }
    }

    @PostMapping("/details")
    public ResponseEntity<UserResponse> getUserDetails(@RequestHeader("Authorization") String authorizationHeader){
        try {
            String extractedToken = authorizationHeader.substring(7);
            User user = userService.getUserDetailFromToken(extractedToken);
            return ResponseEntity.ok(UserResponse.fromUser(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateUser(@Valid @RequestBody UserDTO userDTO, @RequestHeader("Authorization") String authorizationHeader){
        try {
            String extractedToken = authorizationHeader.substring(7);
            UserResponse userResponse = new UserResponse();
            User updatedUser = userService.updateUserDetails(userDTO, extractedToken);
            return ResponseEntity.ok(UserResponse.fromUser(updatedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
