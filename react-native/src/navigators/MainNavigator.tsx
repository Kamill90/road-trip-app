import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../home/HomeScreen';
import QuizScreen from '../Quiz/QuizScreen';

export const MainNavigator = createStackNavigator({
  Home: HomeScreen,
  Quiz: QuizScreen,
});
