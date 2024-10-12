package com.duy.BackendDoAn.services;

import com.duy.BackendDoAn.dtos.UserDTO;
import com.duy.BackendDoAn.models.*;
import com.duy.BackendDoAn.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public User add(UserDTO userDTO) throws Exception{

        Role role =roleRepository.findById(userDTO.getRoleId()).orElseThrow(() -> new Exception("Role not found"));

        User newUser = User.builder().firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .phoneNumber(userDTO.getPhoneNumber())
                .address(userDTO.getAddress())
                .dateOfBirth(userDTO.getDateOfBirth())
                .active(true)
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .build();
        newUser.setRole(role);

        return userRepository.save(newUser);
    }
}
