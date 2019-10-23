//
//  ContentView.swift
//  RoadTripNative
//
//  Created by Kamil Lewandowski on 27/08/2019.
//  Copyright © 2019 Kamil Lewandowski. All rights reserved.
//


import SwiftUI

struct ContentView: View {
    @EnvironmentObject var appState: AppState
    @ObservedObject var location = LocationService()
    
    var body: some View {
        NavigationView{
            VStack{
                Text("is game active? \(String(self.appState.isGameActive))")
                Text("Counter: \(self.location.counter)")
                NavigationLink(destination: GameView().environmentObject(self.appState)) {
                            Text("Go to the game")
                        }
                if (self.appState.isGameActive) {
                    Button(action: {
                        self.location.stopMonitoringLocation()
                        self.appState.isGameActive = false
                    }) {
                        Text("Stop the game")
                    }
                } else {
                    Button(action: {
                        self.location.startMonitoringLocation()
                        let address = self.location.address
                        self.appState.adminDistrict = address.adminDistrict;
                        self.appState.countryRegion = address.countryRegion;
                        self.appState.isGameActive = true;
                    }) {
                        Text("Start the geme")
                    }
                }
            }.navigationBarTitle("Road trip game", displayMode: .inline)
        }
    }
}



