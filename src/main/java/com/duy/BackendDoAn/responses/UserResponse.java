package com.duy.BackendDoAn.responses;

import com.duy.BackendDoAn.models.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("avatar")
    private String avatar;

    @JsonProperty("address")
    private String address;

    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

    @JsonProperty("active")
    private boolean active;

    @JsonProperty("role")
    private String role;

    public static UserResponse fromUser(User user){
        return UserResponse.builder().id(user.getId())
                .firstName(user.getFirst_name())
                .lastName(user.getLast_name())
                .phoneNumber(user.getPhone_number())
                .avatar(user.getAvatar())
                .address(user.getAddress())
                .dateOfBirth(user.getDate_of_birth())
                .active(user.isActive())
                .build();
    }
}
