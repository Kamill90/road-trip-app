//
//  LocationService.swift
//  RoadTripNative
//
//  Created by Kamil Lewandowski on 27/08/2019.
//  Copyright © 2019 Kamil Lewandowski. All rights reserved.
//

import CoreLocation
import SwiftUI
import Combine


class LocationService: NSObject, ObservableObject, CLLocationManagerDelegate{
    @Published var address = LocationData(countryRegion: "", adminDistrict: "")
    var coordinates: Coordinates
    var locationManager: CLLocationManager?
    private let key = Environment.mapApiKey

    override init() {
        
        locationManager = CLLocationManager()
        self.coordinates = Coordinates(longitude: CLLocationDegrees.init(), latitude: CLLocationDegrees.init())
        super.init()
        locationManager?.delegate = self
        locationManager?.requestWhenInUseAuthorization()

    }
    
    func startMonitoringLocation() {
        locationManager?.startMonitoringSignificantLocationChanges()
    }
    
    func stopMonitoringLocation() {
        locationManager?.stopMonitoringSignificantLocationChanges()
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last?.coordinate {
            coordinates.latitude = location.latitude
            coordinates.longitude = location.longitude
            
            self.getAddress(longitude: coordinates.longitude, latitude: coordinates.latitude)
        }
    }
    
    func getAddress(longitude: CLLocationDegrees, latitude: CLLocationDegrees) {
        let url = URL(string: "http://dev.virtualearth.net/REST/v1/Locations/\(latitude),\(longitude)?o=json&key=\(self.key)")!
        
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            guard let data = data else { return }
            let response = try! JSONDecoder().decode(Results.self, from: data)
            DispatchQueue.main.async {
                self.address.adminDistrict = response.resourceSets[0].resources[0].address.adminDistrict;
                self.address.countryRegion = response.resourceSets[0].resources[0].address.countryRegion;
            }
        }.resume()
    }
}
