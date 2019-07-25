import React from 'react';
import { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';


class App extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Hello world</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


export default App;
