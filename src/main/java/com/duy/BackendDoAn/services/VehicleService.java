package com.duy.BackendDoAn.services;

import com.duy.BackendDoAn.dtos.CarDTO;
import com.duy.BackendDoAn.dtos.MotorDTO;
import com.duy.BackendDoAn.models.Car;
import com.duy.BackendDoAn.models.Motor;
import com.duy.BackendDoAn.models.RentalFacility;
import com.duy.BackendDoAn.models.Vehicle;
import com.duy.BackendDoAn.repositories.CarRepository;
import com.duy.BackendDoAn.repositories.MotorRepository;
import com.duy.BackendDoAn.repositories.RentalFacilityRepository;
import com.duy.BackendDoAn.repositories.VehicleRepository;
import com.duy.BackendDoAn.responses.CarResponse;
import com.duy.BackendDoAn.responses.MotorResponse;
import com.duy.BackendDoAn.responses.VehicleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class VehicleService {
    public final RentalFacilityRepository rentalFacilityRepository;
    public final VehicleRepository vehicleRepository;
    public final CarRepository carRepository;
    public final MotorRepository motorRepository;
    public Car addCar(CarDTO carDTO) throws Exception{
        RentalFacility facility = rentalFacilityRepository.findById(carDTO.getFacility()).orElseThrow(() -> new Exception("Rental Facility doesn't exist"));
        Car newCar = Car.builder()
                .name(carDTO.getName())
                .price_per_hour(carDTO.getPricePerHour())
                .stake(carDTO.getStake())
                .image_url(carDTO.getImageUrl())
                .description(carDTO.getDescription())
                .seat_amount(carDTO.getSeatAmount())
                .luggage_amount(carDTO.getLuggageAmount())
                .rentalFacility(facility)
                .fuel_type(carDTO.getFuelType())
                .transmission_type(carDTO.getTransmissionType())
                .trunk_capacity(carDTO.getTrunkCapacity())
                .build();
        return carRepository.save(newCar);
    }

    public Motor addMotor(MotorDTO motorDTO) throws Exception {
        RentalFacility facility = rentalFacilityRepository.findById(motorDTO.getFacility()).orElseThrow(() -> new Exception("Rental Facility doesn't exist"));
        Motor newMotor = Motor.builder()
                .name(motorDTO.getName())
                .price_per_hour(motorDTO.getPricePerHour())
                .stake(motorDTO.getStake())
                .image_url(motorDTO.getImageUrl())
                .description(motorDTO.getDescription())
                .seat_amount(motorDTO.getSeatAmount())
                .luggage_amount(motorDTO.getLuggageAmount())
                .rentalFacility(facility)
                .type_of_motor(motorDTO.getTypeOfMotor())
                .handle_bar_type(motorDTO.getHandleBarType())
                .fuel_type(motorDTO.getFuelType())
                .build();
        return motorRepository.save(newMotor);
    }

    public Page<VehicleResponse> getAllVehicle(String type, String location, LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime, PageRequest pageRequest) {
        Page<Vehicle> vehiclePage;
        vehiclePage = vehicleRepository.searchVehicle(type, location, startDate, endDate, startTime, endTime, pageRequest);
        return vehiclePage.map(VehicleResponse::fromVehicle);
    }

    public Vehicle getVehicleById(Long id) throws Exception {
        return vehicleRepository.findById(id).orElseThrow(() -> new Exception("Vehicle not found"));
    }

    public Object getSpecificVehicleById(Long id) throws Exception {
        Vehicle vehicle = getVehicleById(id);
        if("CAR".equals(vehicle.getVehicle_type())){
            Car car = carRepository.findById(id).orElseThrow(()-> new Exception("Car not found"));
            return CarResponse.fromCar(car);
        }
        if ("MOTOR".equals(vehicle.getVehicle_type())){
            Motor motor = motorRepository.findById(id).orElseThrow(()-> new Exception("Motor not found"));
            return MotorResponse.fromMotor(motor);
        }
        throw new IllegalArgumentException("Unknown vehicle type");
    }

    public Car updateCar(long id, CarDTO carDTO) throws Exception {
        Object car = getSpecificVehicleById(id);
        if(car instanceof Car existingCar){
            RentalFacility rentalFacility = rentalFacilityRepository.findById(existingCar.getRentalFacility().getId()).orElseThrow(()-> new Exception("Facility not exist"));
            existingCar.setRentalFacility(rentalFacility);
            if(carDTO.getName() != null && !carDTO.getName().isEmpty()){
                existingCar.setName(carDTO.getName());
            }
            if(carDTO.getDescription() != null && !carDTO.getDescription().isEmpty()){
                existingCar.setDescription(carDTO.getDescription());
            }
            if(carDTO.getPricePerHour() > 0){
                existingCar.setPrice_per_hour(carDTO.getPricePerHour());
            }
            if(carDTO.getSeatAmount() > 0){
                existingCar.setSeat_amount(carDTO.getSeatAmount());
            }
            if(carDTO.getLuggageAmount() >= 0){
                existingCar.setLuggage_amount(carDTO.getLuggageAmount());
            }
            if(carDTO.getFuelType() != null && !carDTO.getFuelType().isEmpty()){
                existingCar.setFuel_type(carDTO.getFuelType());
            }
            if(carDTO.getTransmissionType() != null && !carDTO.getTransmissionType().isEmpty()){
                existingCar.setTransmission_type(carDTO.getTransmissionType());
            }
            if(carDTO.getTrunkCapacity() > 0){
                existingCar.setTrunk_capacity(carDTO.getTrunkCapacity());
            }
            return carRepository.save(existingCar);
        }
        else return null;
    }

    public Motor updateMotor(long id, MotorDTO motorDTO) throws Exception {
        Object motor = getSpecificVehicleById(id);
        if(motor instanceof Motor existingMotor){
            RentalFacility rentalFacility = rentalFacilityRepository.findById(existingMotor.getRentalFacility().getId()).orElseThrow(()-> new Exception("Facility not exist"));
            existingMotor.setRentalFacility(rentalFacility);
            if(motorDTO.getName() != null && !motorDTO.getName().isEmpty()){
                existingMotor.setName(motorDTO.getName());
            }
            if(motorDTO.getDescription() != null && !motorDTO.getDescription().isEmpty()){
                existingMotor.setDescription(motorDTO.getDescription());
            }
            if(motorDTO.getPricePerHour() > 0){
                existingMotor.setPrice_per_hour(motorDTO.getPricePerHour());
            }
            if(motorDTO.getSeatAmount() > 0){
                existingMotor.setSeat_amount(motorDTO.getSeatAmount());
            }
            if(motorDTO.getLuggageAmount() >= 0){
                existingMotor.setLuggage_amount(motorDTO.getLuggageAmount());
            }
            if(motorDTO.getFuelType() != null && !motorDTO.getFuelType().isEmpty()){
                existingMotor.setFuel_type(motorDTO.getFuelType());
            }
            if(motorDTO.getTypeOfMotor() != null && !motorDTO.getTypeOfMotor().isEmpty()){
                existingMotor.setType_of_motor(motorDTO.getTypeOfMotor());
            }
            if(motorDTO.getHandleBarType() != null && !motorDTO.getHandleBarType().isEmpty()){
                existingMotor.setHandle_bar_type(motorDTO.getHandleBarType());
            }
            return motorRepository.save(existingMotor);
        }
        else return null;
    }

    public void deleteVehicleById(Long id) throws Exception {
        Vehicle vehicle = getVehicleById(id);
        if("CAR".equals(vehicle.getVehicle_type())) {
            carRepository.deleteById(id);
        }
        else if ("MOTOR".equals(vehicle.getVehicle_type())) {
            motorRepository.deleteById(id);
        }
        vehicleRepository.deleteById(id);
    }
}
