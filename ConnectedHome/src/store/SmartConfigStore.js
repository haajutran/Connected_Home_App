import * as dataService from '../services/DataServices';
import * as constant from '../services/Constant';
import * as authService from '../services/AuthServices';

// Initial State
const initialState = {
  addSwitchIntoAccoutnSuccess: [],
  addedDevices: [],
};

// Map State To Props (Redux Store Passes State To Component)
export const mapStateToProps = state => {
  // if (state.smartConfigReducer.addSwitchIntoAccoutnSuccess === true) {
  //   return {
  //     addSwitchIntoAccoutnSuccess:
  //       state.smartConfigReducer.addSwitchIntoAccoutnSuccess,
  //     addedDevices: state.smartConfigReducer.addedDevices,
  //   };
  // }
  return {...state.smartConfigReducer};
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
export const mapDispatchToProps = dispatch => {
  // Action
  return {
    registerDevice: async listDevices => {
      const currentUser = await authService.getLoggedInUser();
      var addedDevices = [];

      for (var i = 0; i < listDevices.length; i++) {
        var code = '';

        for (var j = 0; j < listDevices[i].bssid.length; j++) {
          code += listDevices[i].bssid.charAt(j);
          code = code.toUpperCase();
          if (j % 2 === 1 && j !== listDevices[i].bssid.length - 1) {
            code += ':';
          }
        }

        var data = {
          email: currentUser.email,
          code: code,
        };

        var res = await dataService.put(
          `api/switches/updateSwitchInformation`,
          data,
        );

        if (res.status === 200) {
          addedDevices.push(res.data);
        }
      }

      dispatch({
        type: 'REQUEST_ADD_SWITCH_INTO_ACCOUNT',
        addedDevices,
      });
    },
  };
};

export const smartConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_ADD_SWITCH_INTO_ACCOUNT':
      return {
        ...state,
        addSwitchIntoAccoutnSuccess: true,
        addedDevices: action.addedDevices,
      };
      break;

    // Default
    default: {
      return state;
    }
  }
};

// Exports Reducer
export default smartConfigReducer;
