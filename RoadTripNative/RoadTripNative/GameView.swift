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
    var location = LocationService()
    @EnvironmentObject var appState: AppState
    var body: some View {
        VStack{
            Text("countryRegion: \(self.appState.countryRegion)")
            Text("adminDistrict: \(self.appState.adminDistrict)")
        }
    }
    func startMonitoring() {
        self.location.startMonitoringLocation()
    }
}
