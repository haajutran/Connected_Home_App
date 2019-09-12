// In App.js in a new project

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './Authentication/LoginScreen';
import TestScreen from './Test';
import AuthLoadingScreen from './AuthLoadingScreen';

const AppNavigator = createStackNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    Test: TestScreen,
  },
  {
    initialRouteName: 'AuthLoading',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(AppNavigator);
