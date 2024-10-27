package com.duy.BackendDoAn.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HotelImageDTO {
    @JsonProperty("hotel_id")
    private Long hotel;

    @JsonProperty("image_url")
    private String imageUrl;
}
