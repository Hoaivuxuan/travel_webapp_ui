package com.duy.BackendDoAn.services;

import com.duy.BackendDoAn.components.JwtTokenUtil;
import com.duy.BackendDoAn.configurations.SecureConfig;
import com.duy.BackendDoAn.dtos.UserDTO;
import com.duy.BackendDoAn.dtos.UserRegisterDTO;
import com.duy.BackendDoAn.models.*;
import com.duy.BackendDoAn.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.expression.ExpressionException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private static final Pattern EMAIL = Pattern.compile("([^@]+)@");
    private static final String unknownUserAvatar = "uploads/UNKNOWN_USER.PNG";

    public User add(UserRegisterDTO userRegisterDTO) throws Exception {
        if (userRepository.existsByEmail(userRegisterDTO.getEmail())) {
            throw new DataIntegrityViolationException("Email already been used");
        }
        if (!userRegisterDTO.getPassword().equals(userRegisterDTO.getRetypePassword())) {
            throw new Exception("Password and Confirm password doesn't match");
        }
        User newUser = User.builder()
                .first_name(getUsernameFromEmail(userRegisterDTO.getEmail()))
                .avatar(unknownUserAvatar)
                .email(userRegisterDTO.getEmail())
                .active(true)
                .password(userRegisterDTO.getPassword())
                .role("USER")
                .build();
        String password = userRegisterDTO.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        newUser.setPassword(encodedPassword);
        return userRepository.save(newUser);
    }

    public static String getUsernameFromEmail(String email) {
        Matcher matcher = EMAIL.matcher(email);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null; // Trả về null nếu không tìm thấy
    }

    public String login(String email, String password) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) throw new Exception("Invalid email or password");
        User existingUser = optionalUser.get();

        if (!passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new BadCredentialsException("Wrong email or password");
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                email, password,
                existingUser.getAuthorities()
        );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(optionalUser.get());
    }

    public User getUserDetailFromToken(String token) throws Exception {
        if (jwtTokenUtil.isTokenExpired(token)) {
            throw new Exception("Token is expired!");
        }
        String email = jwtTokenUtil.extractEmail(token);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new Exception("User not found");
        }
    }

    public User updateUserDetails(UserDTO userDTO, String token) throws Exception {
        String email = jwtTokenUtil.extractEmail(token);
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User user = optionalUser.orElseThrow(() -> new Exception("User not found"));
        user.setAddress(userDTO.getAddress());
        user.setFirst_name(userDTO.getFirstName());
        user.setLast_name(userDTO.getLastName());
        user.setPhone_number(userDTO.getPhoneNumber());
        user.setPhone_number(userDTO.getPhoneNumber());
        user.setDate_of_birth(userDTO.getDateOfBirth());
        user.setAvatar(userDTO.getAvatar());
        return userRepository.save(user);
    }
}
