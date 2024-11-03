package com.duy.BackendDoAn.responses;

import com.duy.BackendDoAn.models.TicketClass;
import com.duy.BackendDoAn.models.Tour;
import com.duy.BackendDoAn.models.TourImage;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourResponse {
    @JsonProperty("name")
    private String name;

    @JsonProperty("address")
    private String address;

    @JsonProperty("start_time")
    private LocalTime startTime;

    @JsonProperty("end_time")
    private LocalTime endTime;

    @JsonProperty("description")
    private String description;

    @JsonProperty("city_id")
    private Long city;

    @JsonProperty("ticket_classes")
    private List<TicketClass> ticketClasses;

    @JsonProperty("tour_images")
    private List<TourImage> tourImages;

    public static TourResponse fromTour(Tour tour){
        TourResponse tourResponse = TourResponse.builder()
                .name(tour.getName())
                .address(tour.getAddress())
                .startTime(tour.getStart_time())
                .endTime(tour.getEnd_time())
                .description(tour.getDescription())
                .city(tour.getCity().getId())
                .ticketClasses(tour.getTicketClasses())
                .tourImages(tour.getTourImages())
                .build();
        return tourResponse;
    }
}
