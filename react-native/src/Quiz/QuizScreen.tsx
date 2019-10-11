import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { NavigationInjectedProps } from 'react-navigation';

import { locationDataQuery } from 'api';

interface Props extends NavigationInjectedProps {
  locationDataResult: any;
}

class QuizScreen extends React.PureComponent<Props> {
  stopGame = () => {
    const stop = this.props.navigation.getParam('stopGame');
    stop();
    this.props.navigation.navigate('Home');
  };

  render() {
    const { locationDataResult } = this.props;
    if (locationDataResult.loading) {
      return null;
    }
    return (
      <View style={styles.mainContainer}>
        <Text>
          countryRegion: {locationDataResult.locationData.countryRegion}{' '}
        </Text>
        <Text>
          adminDistrict: {locationDataResult.locationData.adminDistrict}{' '}
        </Text>
        <Button title="Stop the game" onPress={this.stopGame} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default compose(
  graphql(locationDataQuery, { name: 'locationDataResult' }),
)(QuizScreen);
