//
//  Models.swift
//  RoadTripNative
//
//  Created by Kamil Lewandowski on 21/09/2019.
//  Copyright © 2019 Kamil Lewandowski. All rights reserved.
//

import CoreLocation

class AppState: ObservableObject {
    @Published var counter = 0
    @Published var isGameActive = false
    @Published var countryRegion = ""
    @Published var adminDistrict = ""
}

struct Coordinates {
    var longitude: CLLocationDegrees
    var latitude: CLLocationDegrees
}

struct LocationData: Decodable {
    var countryRegion: String
    var adminDistrict: String
}

struct Resource: Decodable {
    var address: LocationData
}

struct ResourcesObject: Decodable {
    var estimatedTotal: Int
    var resources: [Resource]
}

struct Results: Decodable {
    var authenticationResultCode: String
    var statusCode: Int
    var resourceSets: [ResourcesObject]
}
