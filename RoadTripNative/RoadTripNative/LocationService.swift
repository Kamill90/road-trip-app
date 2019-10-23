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


class LocationService: NSObject, ObservableObject, CLLocationManagerDelegate {
    @Published var address = LocationData(countryRegion: "", adminDistrict: "")
    @Published var counter = 0
    
    var locationManager = CLLocationManager()
    var notificationService = NotificationService()
    private let key = Environment.mapApiKey

    override init() {
        super.init()
        self.locationManager.delegate = self
        self.locationManager.requestAlwaysAuthorization()
    }
    
    func startMonitoringLocation() {
        locationManager.startMonitoringSignificantLocationChanges()
    }
    
    func stopMonitoringLocation() {
        locationManager.stopMonitoringSignificantLocationChanges()
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last?.coordinate {
            self.getAddress(longitude: location.longitude, latitude: location.latitude)
            print(self.address)
        } else {
            return
        }
    }
    
    func getAddress(longitude: CLLocationDegrees, latitude: CLLocationDegrees) {
        let url = URL(string: "http://dev.virtualearth.net/REST/v1/Locations/\(latitude),\(longitude)?o=json&key=\(self.key)")!
        self.notificationService.sendLocalNotification(title: "test", body: "body2")
        return URLSession.shared.dataTask(with: url) { (data, response, error) in
            guard let data = data else { return }
            let response = try! JSONDecoder().decode(Results.self, from: data)
            DispatchQueue.main.async {
                self.address.adminDistrict = response.resourceSets[0].resources[0].address.adminDistrict;
                self.address.countryRegion = response.resourceSets[0].resources[0].address.countryRegion;
                self.counter += 1
            }
       }.resume()
    }
}
