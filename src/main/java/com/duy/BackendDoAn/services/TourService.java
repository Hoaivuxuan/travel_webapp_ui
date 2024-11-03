package com.duy.BackendDoAn.services;

import com.duy.BackendDoAn.dtos.TourDTO;
import com.duy.BackendDoAn.models.City;
import com.duy.BackendDoAn.models.Tour;
import com.duy.BackendDoAn.repositories.CityRepository;
import com.duy.BackendDoAn.repositories.TourRepository;
import com.duy.BackendDoAn.responses.TourResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TourService {
    private final TourRepository tourRepository;
    private final CityRepository cityRepository;
    public Tour addTour(TourDTO tourDTO) throws Exception {
        City city = cityRepository.findById(tourDTO.getCity()).orElseThrow(() -> new Exception("Not support this city"));
        Tour tour = Tour.builder()
                .name(tourDTO.getName())
                .address(tourDTO.getAddress())
                .start_time(tourDTO.getStartTime())
                .end_time(tourDTO.getEndTime())
                .description(tourDTO.getDescription())
                .city(city)
                .build();
        return tourRepository.save(tour);
    }

    public Tour getTourById(long id) throws Exception {
        return tourRepository.findById(id).orElseThrow(()-> new Exception("Tour not found"));
    }



    public Tour updateTour(long tourId, TourDTO tourDTO) throws Exception {
        Tour tour = getTourById(tourId);
        if(tour != null){
            City existingCity = cityRepository.findById(tourDTO.getCity()).orElseThrow(() -> new Exception("Not support this city"));
            if(tourDTO.getName() != null && !tourDTO.getName().isEmpty()){
                tour.setName(tourDTO.getName());
            }
            if(tourDTO.getAddress() != null && !tourDTO.getAddress().isEmpty()){
                tour.setAddress(tourDTO.getAddress());
            }
            if(tourDTO.getDescription() != null && !tourDTO.getDescription().isEmpty()){
                tour.setDescription(tourDTO.getDescription());
            }
            if(tourDTO.getStartTime() != null){
                tour.setStart_time(tourDTO.getStartTime());
            }
            if(tourDTO.getEndTime() != null) {
                tour.setEnd_time(tourDTO.getEndTime());
            }
            tour.setCity(existingCity);
            return tourRepository.save(tour);
        }
        return null;
    }

    public void deleteTour(long id) {
        Optional<Tour> optionalTour = tourRepository.findById(id);
        optionalTour.ifPresent(tourRepository::delete);
    }

//    public Page<TourResponse> getAllTours(String location, LocalDate startFrom, LocalDate endAt, PageRequest pageRequest){
//        Page<Tour> tourPage;
//        tourPage = tourRepository.searchTours(location, startFrom, endAt, pageRequest);
//        return tourPage.map(TourResponse::fromTour);
//    }
}
