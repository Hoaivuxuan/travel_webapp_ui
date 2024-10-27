package com.duy.BackendDoAn.services;

import com.duy.BackendDoAn.dtos.HotelDTO;
import com.duy.BackendDoAn.dtos.HotelImageDTO;
import com.duy.BackendDoAn.models.*;
import com.duy.BackendDoAn.repositories.*;
import com.duy.BackendDoAn.responses.HotelResponse;
import com.duy.BackendDoAn.utils.FileUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HotelService {
    public final CityRepository cityRepository;
    public final UserRepository userRepository;
    public final HotelRepository hotelRepository;
    public final HotelImageRepository hotelImageRepository;


    @Transactional
    public Hotel requestAddHotel(HotelDTO hotelDTO) throws Exception{
        City city = cityRepository.findById(hotelDTO.getCity()).orElseThrow(() -> new Exception("Not support this province"));
        User owner = userRepository.findById(hotelDTO.getOwner()).orElseThrow(() -> new Exception("Not support this owner"));

        Hotel newHotel = Hotel.builder()
                .hotelName(hotelDTO.getHotelName())
                .hotelEmail(hotelDTO.getHotelEmail())
                .phone_number(hotelDTO.getPhoneNumber())
                .address(hotelDTO.getAddress())
                .longitude(hotelDTO.getLongitude())
                .latitude(hotelDTO.getLatitude())
                .description(hotelDTO.getDescription())
                .rating(hotelDTO.getRating())
                .hotelStatus("WAITING")
                .type_of_hotel(hotelDTO.getTypeOfHotel())
                .build();
        newHotel.setCity(city);
        newHotel.setOwner(owner);
        return hotelRepository.save(newHotel);
    }

    public Hotel getHotelById(long id){
        return hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found"));
    }

    @Transactional
    public Hotel updateHotel(long hotelID, HotelDTO hotelDTO) throws Exception{
        Hotel hotel = getHotelById(hotelID);
        if(hotel != null){
            City existingCity = cityRepository.findById(hotelDTO.getCity())
                    .orElseThrow(() -> new Exception("Cannot find city with id: "+hotelDTO.getCity()));

            if(hotelDTO.getHotelName() != null && !hotelDTO.getHotelName().isEmpty()){
                hotel.setHotelName(hotelDTO.getHotelName());
            }

            hotel.setCity(existingCity);
            if(hotelDTO.getHotelEmail() != null && !hotelDTO.getHotelEmail().isEmpty()){
                hotel.setHotelEmail(hotelDTO.getHotelEmail());
            }

            if (hotelDTO.getDescription() != null && !hotelDTO.getDescription().isEmpty()){
                hotel.setDescription(hotelDTO.getDescription());
            }

            if(hotelDTO.getPhoneNumber() != null && !hotelDTO.getPhoneNumber().isEmpty()){
                hotel.setPhone_number(hotelDTO.getPhoneNumber());
            }

            if(hotelDTO.getAddress() != null && !hotelDTO.getAddress().isEmpty()){
                hotel.setAddress(hotelDTO.getAddress());
            }
            return hotelRepository.save(hotel);
        }
        return null;
    }

    public HotelImage createHotelImage(Long id, HotelImageDTO hotelImageDTO) throws Exception{
        Hotel existingHotel = getHotelById(id);
        HotelImage hotelImage = HotelImage.builder()
                .hotel(existingHotel)
                .image_url(hotelImageDTO.getImageUrl())
                .build();
        int size = hotelImageRepository.countByHotelId(id);
        if(size > HotelImage.MAX_IMAGES_PER_HOTEL){
            throw new Exception("Number of images more than "+HotelImage.MAX_IMAGES_PER_HOTEL);
        }
        return hotelImageRepository.save(hotelImage);
    }

    public Page<HotelResponse> getAllHotels(String keyword, int groupAdults, int groupChildren, int noRooms, LocalDate checkin, LocalDate checkout, String type_of_room, Float minRating, Float maxRating, PageRequest pageRequest){
        Page<Hotel> hotelsPage;
        hotelsPage = hotelRepository.searchHotels(keyword, groupAdults, groupChildren, noRooms, checkin, checkout, type_of_room, minRating, maxRating, pageRequest);
        return hotelsPage.map(HotelResponse::fromHotel);
    }

    @Transactional
    public void deleteHotel(long id){
        Optional<Hotel> optionalHotel = hotelRepository.findById(id);
        optionalHotel.ifPresent(hotelRepository::delete);
    }


}
