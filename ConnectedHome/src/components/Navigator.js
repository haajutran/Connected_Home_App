// In App.js in a new project

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './Authentication/LoginScreen';
import HomeScreen from './Home';
import SmartConfigScreen from './SmartConfig';
import AuthLoadingScreen from './AuthLoadingScreen';

//Switch
import SwitchesListScreen from './Switch/SwitchesListScreen';

const AppNavigator = createStackNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    SwitchesList: SwitchesListScreen,
    SmartConfig: SmartConfigScreen,
  },
  {
    initialRouteName: 'SmartConfig',
    defaultNavigationOptions: {
      header: null,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
  {
    initialRouteName: 'SwitchesList',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(AppNavigator);
