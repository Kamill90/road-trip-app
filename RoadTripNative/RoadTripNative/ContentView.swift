//
//  ContentView.swift
//  RoadTripNative
//
//  Created by Kamil Lewandowski on 27/08/2019.
//  Copyright © 2019 Kamil Lewandowski. All rights reserved.
//

import SwiftUI
import Combine

struct ContentView: View {
    @ObservedObject var location = LocationService()

    var body: some View {
        Text("Hello at \(self.location.latitude)")
    }
}
