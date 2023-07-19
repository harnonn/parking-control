//package com.api.parkingcontrol;
//
//import java.util.Optional;
//import java.util.UUID;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import com.api.parkingcontrol.models.ParkingSpotModel;
//import com.api.parkingcontrol.services.ParkingSpotService;
//
//@Component
//public class Tests implements CommandLineRunner {
//
//	@Autowired
//	private ParkingSpotService parkingSpotService;
//
//	@Override
//	public void run(String... args) throws Exception {
//		// TODO Auto-generated method stub
//		UUID uid = UUID.fromString("295b1faa-c138-4b11-9496-b2660f337af7");
//		Optional<ParkingSpotModel> findById = parkingSpotService.findById(uid);
//		System.out.println(findById.get().getLicensePlateCar());
//
//		ParkingSpotModel findByParkingSpotNumber = parkingSpotService.findByParkingSpotNumber("207C");
//		System.out.println(findByParkingSpotNumber.getId());
//
//	}
//
//}
