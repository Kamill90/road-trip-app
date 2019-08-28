//
//  LocationService.swift
//  RoadTripNative
//
//  Created by Kamil Lewandowski on 27/08/2019.
//  Copyright © 2019 Kamil Lewandowski. All rights reserved.
//

import Foundation
import CoreLocation
import SwiftUI
import Combine

struct Coordinates {
    var longitude: CLLocationDegrees
    var latitude: CLLocationDegrees
}

class LocationService: NSObject, ObservableObject, CLLocationManagerDelegate{
    @Published var coordinates: Coordinates
    var locationManager: CLLocationManager?
    override init() {
        
        locationManager = CLLocationManager()
        self.coordinates = Coordinates(longitude: CLLocationDegrees.init(), latitude: CLLocationDegrees.init())
        super.init()
        locationManager?.delegate = self
        locationManager?.requestWhenInUseAuthorization()
        locationManager?.startUpdatingLocation()

    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last?.coordinate {
            coordinates.latitude = location.latitude
            coordinates.longitude = location.longitude
        }
    }
}
