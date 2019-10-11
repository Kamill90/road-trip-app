import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../home/HomeScreen';
import QuizScreen from '../Quiz/QuizScreen';

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Road trip game',
      },
    },
    Quiz: QuizScreen,
  },
  { headerMode: 'screen' },
);
