import * as dataService from '../services/DataServices';
import * as constant from '../services/Constant';
import {AsyncStorage} from 'react-native';

// Initial State
const initialState = {
  // loggedIn: false,
};

// Map State To Props (Redux Store Passes State To Component)
export const mapStateToProps = state => {
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

        if (res.status === 200 && res.data.access_token) {
          await AsyncStorage.setItem(
            constant.CURRENT_USER,
            JSON.stringify(res.data),
          );
        }
        return res;
      } catch (e) {
        console.log(e.message);
      }
    },
    confirmEmail: async email => {
      try {
        var res = await dataService.post(
          `api/accounts/generateconfirmationcode/${email}`,
        );
        return res;
      } catch (e) {
        console.log(e.message);
      }
    },
    signUp: async data => {
      try {
        var res = await dataService.post('api/accounts/registerwithcode', data);
        return res;
      } catch (e) {
        console.log(e.message);
      }
    },
  };
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

// Exports Reducer
export default authReducer;
