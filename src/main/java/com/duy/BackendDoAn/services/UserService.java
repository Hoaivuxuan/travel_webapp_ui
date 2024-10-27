package com.duy.BackendDoAn.services;

import com.duy.BackendDoAn.components.JwtTokenUtil;
import com.duy.BackendDoAn.configurations.SecureConfig;
import com.duy.BackendDoAn.dtos.UserDTO;
import com.duy.BackendDoAn.models.*;
import com.duy.BackendDoAn.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public User add(UserDTO userDTO) throws Exception{
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw new DataIntegrityViolationException("Email already been used");
        }
        User newUser = User.builder()
                .first_name(userDTO.getFirstName())
                .last_name(userDTO.getLastName())
                .phone_number(userDTO.getPhoneNumber())
                .email(userDTO.getEmail())
                .address(userDTO.getAddress())
                .date_of_birth(userDTO.getDateOfBirth())
                .active(userDTO.isActive())
                .password(userDTO.getPassword())
                .role("USER")
                .build();
        String password = userDTO.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        newUser.setPassword(encodedPassword);
        return userRepository.save(newUser);
    }

    public String login(String email, String password) throws Exception{
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()) throw new Exception("Invalid email or password");
        User existingUser = optionalUser.get();

        if(!passwordEncoder.matches(password, existingUser.getPassword())){
            throw new BadCredentialsException("Wrong email or password");
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                email,password,
                existingUser.getAuthorities()
        );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(optionalUser.get());
    }
}
