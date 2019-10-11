//
//  GameView.swift
//  RoadTripNative
//
//  Created by Kamil Lewandowski on 11/10/2019.
//  Copyright © 2019 Kamil Lewandowski. All rights reserved.
//
import SwiftUI
import Combine

struct GameView: View {
    @ObservedObject var location = LocationService()
    var body: some View {
        VStack{
            Text("countryRegion: \(self.location.address.countryRegion)")
            Text("adminDistrict: \(self.location.address.adminDistrict)")
        }.onAppear(perform: startMonitoring).onDisappear(perform: stopMonitoring)
    }
    
    func startMonitoring() {
        self.location.startMonitoringLocation()
    }
    func stopMonitoring() {
        self.location.stopMonitoringLocation()
    }
}
