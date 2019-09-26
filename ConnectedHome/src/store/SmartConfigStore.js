import * as dataService from '../services/DataServices';
import * as constant from '../services/Constant';
import {AsyncStorage} from 'react-native';

// Initial State
const initialState = {};

// Map State To Props (Redux Store Passes State To Component)
export const mapStateToProps = state => {
  return {};
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
export const mapDispatchToProps = dispatch => {
  // Action
  return {
    registerDevice: async listDevices => {},
  };
};

export const smartConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    // Default
    default: {
      return state;
    }
  }
};

// Exports Reducer
export default smartConfigReducer;
