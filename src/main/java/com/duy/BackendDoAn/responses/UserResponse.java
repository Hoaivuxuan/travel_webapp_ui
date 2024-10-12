package com.duy.BackendDoAn.responses;

import com.duy.BackendDoAn.models.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

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

    @JsonProperty("address")
    private String address;

    @JsonProperty("date_of_birth")
    private Date dateOfBirth;

    @JsonProperty("active")
    private boolean active;

    @JsonProperty("username")
    private String username;

    @JsonProperty("role_id")
    private Long roleId;

    public static UserResponse fromUser(User user){
        return UserResponse.builder().id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .dateOfBirth(user.getDateOfBirth())
                .active(user.isActive())
                .username(user.getUsername())
                .roleId(user.getRole().getId())
                .build();
    }
}
