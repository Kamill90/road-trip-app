//
//  ContentView.swift
//  RoadTripNative
//
//  Created by Kamil Lewandowski on 27/08/2019.
//  Copyright © 2019 Kamil Lewandowski. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView{
            VStack{
                NavigationLink(destination: GameView()) {
                    Text("Go to the game")
                }
            }.navigationBarTitle("Road trip game")
        }
    }
}



