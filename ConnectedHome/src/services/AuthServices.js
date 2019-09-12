import * as constant from './Constant';
import {AsyncStorage} from 'react-native';

export const isUserAuthenticated = async () => {
  const user = await AsyncStorage.getItem(constant.CURRENT_USER);
  console.log(user);
  if (user !== null) {
    return true;
  } else return false;
};

export const isExpired = async () => {
  const user = await getLoggedInUser();
  console.log(user);
  if (user === null) {
    return true;
  } else if (new Date(user.expires) > new Date()) {
    return false;
  } else {
    return true;
  }
};

export const clearLocalStorage = async () => {
  await AsyncStorage.removeItem(constant.CURRENT_USER);
};

export const logOut = () => {
  clearLocalStorage();
  //window.location.assign("/");
};

export const checkUserAction = action => {
  var user = getLoggedInUser();

  if (user.actions.some(a => a === action)) {
    return true;
  } else {
    return false;
  }
};

export const getLoggedInUser = async () => {
  var user = {
    access_token: '',
    email: '',
    expires: '',
    menu: [],
    actions: [],
  };
  if (isUserAuthenticated()) {
    const currentUser = await AsyncStorage.getItem(constant.CURRENT_USER);
    var userData = JSON.parse(currentUser);
    user = {
      access_token: userData.access_token,
      email: userData.email,
      expires: userData.expires,
      menu: userData.menu,
      actions: userData.actions,
    };
  }
  return user;
};
