import * as dataService from '../services/DataServices';
import * as constant from '../services/Constant';
import {AsyncStorage} from 'react-native';

// Initial State
const initialState = {
  // loggedIn: false,
};

// Map State To Props (Redux Store Passes State To Component)
export const mapStateToProps = state => {
  console.log('State:');
  console.log(state);
  // Redux Store --> Component
  return {
    // counter: state.counterReducer.counter,
    // loggedIn: state.authReducer.loggedIn,
  };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
export const mapDispatchToProps = dispatch => {
  // Action
  return {
    login: async data => {
      try {
        const res = await dataService.login(data);
        console.log(res);
        if (res.status === 200 && res.data.access_token) {
          console.log('hello');
          await AsyncStorage.setItem(
            constant.CURRENT_USER,
            JSON.stringify(res.data),
          );
        }
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    // hau: () => () => {
    //   console.log('hau');
    // },
    // hau: () => {
    //   console.log('hau');
    // },
    // // Decrease Counter
    // reduxDecreaseCounter: payload =>
    //   dispatch({
    //     type: 'DECREASE_COUNTER',
    //     payload: payload,
    //   }),
    // // Login
    // reduxLogin: payload =>
    //   dispatch({
    //     type: 'LOGGED_IN',
    //     payload: payload,
    //   }),
  };
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'INCREASE_COUNTER': {
    //   return {
    //     ...state,
    //     counter: state.counter + 1,
    //   };
    // }

    // Default
    default: {
      return state;
    }
  }
};

// Exports Reducer
export default authReducer;
