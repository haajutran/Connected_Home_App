import * as dataService from '../services/DataServices';
import * as constant from '../services/Constant';
import * as authService from '../services/AuthServices';
import * as signalR from '@aspnet/signalr';

const initialState = {
  switches: {
    totalItems: 0,
    items: [],
  },
  connection: undefined,
  proxy: undefined,
};

export const mapStateToProps = state => {
  return {
    switches: state.switchReducer.switches,
  };
};

export const signalRLoadData = async dispatch => {
  try {
    dispatch({
      type: 'REQUEST_SWITCH',
    });
    const currentUser = await authService.getLoggedInUser();
    var res = await dataService.get(
      `api/switches/getall?email=${currentUser.email}`,
    );

    if (res.status === 200) {
      dispatch({
        type: 'RECEIVE_SWITCH',
        switches: res.data,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const mapDispatchToProps = dispatch => {
  return {
    requestSwitches: async () => {
      const connection = new signalR.HubConnectionBuilder() //Connect to a hub
        .withUrl('http://180.148.1.174:8082/hub', {
          transport:
            signalR.HttpTransportType.WebSockets |
            signalR.HttpTransportType.LongPolling,
          'content-type': 'application/json',
          //accessTokenFactory: () => authToken, //for authorization
        })
        .configureLogging(signalR.LogLevel.Debug)
        .build();
      dispatch({
        type: 'REQUEST_SWITCH',
      });
      const currentUser = await authService.getLoggedInUser();
      var requestSwitchesRes = await dataService.get(
        `api/switches/getall?email=${currentUser.email}`,
      );

      if (requestSwitchesRes.status === 200) {
        requestSwitchesRes.data.items.map(item => {
          // alert('ádasdsa');
          connection.on(`${item.code}/UpdateSubSwitch`, () => {
            signalRLoadData(dispatch);
          });
        });

        connection
          .start()
          .then(() => {
            console.log('Chat Connection started.');
            console.log('Now connected, connection ID=' + connection.id);
          })
          .catch(() => {
            console.log('Error while establishing chatbus connection!');
          });
      }
      dispatch({
        type: 'RECEIVE_SWITCH',
        switches: requestSwitchesRes.data,
      });
    },

    // requestSwitches: async () => {
    //   try {
    //     dispatch({
    //       type: 'REQUEST_SWITCH',
    //     });
    //     const currentUser = await authService.getLoggedInUser();
    //     var res = await dataService.get(
    //       `api/switches/getall?email=${currentUser.email}`,
    //     );
    //     console.log(res);
    //     if (res.status === 200) {
    //       dispatch({
    //         type: 'RECEIVE_SWITCH',
    //         switches: res.data,
    //       });
    //     }
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // },
    loadSwitchesData: async page => {
      // Only load data if it's something we don't already have (and are not already loading)
      const appState = getState();
      if (appState && appState.switch && page != appState.switch.page) {
        if (page == null) {
          page = 1;
        }

        var switches = await dataService.get(
          `api/switches/getall?page=${page}&pagesize=${constant.pageSize}`,
        );

        var errorMessage = null;
        if (switches.status != 200) {
          errorMessage = switches.data;
        }

        dispatch({
          type: 'RECEIVE_SWITCH',
          switches: switches.data,
          page: page,
          isAddSuccess: null,
          isUpdateSuccess: null,
          isDeleteSuccess: null,
          errorMessage: errorMessage,
          searchParam: null,
        });
      }
    },

    loadSwitchesDataBySearchParam: async (page, searchParam) => {
      // Only load data if it's something we don't already have (and are not already loading)
      const appState = getState();
      if (appState && appState.switch && page != appState.switch.page) {
        if (page == null) {
          page = 1;
        }

        var switches = await dataService.get(
          `api/switches/getall?page=${page}&pagesize=${constant.pageSize}&searchParam=${searchParam}`,
        );

        var errorMessage = null;
        if (switches.status != 200) {
          errorMessage = switches.data;
        }

        dispatch({
          type: 'RECEIVE_SWITCH',
          switches: switches.data,
          page: page,
          isAddSuccess: null,
          isUpdateSuccess: null,
          isDeleteSuccess: null,
          errorMessage: errorMessage,
          searchParam: null,
        });
      }
    },

    addSwitch: async data => {
      var result = await dataService.post('api/switches/add', data);

      var errorMessage = null;
      var isAddSuccess = false;

      if (result.status == 200) {
        isAddSuccess = true;
      } else {
        isAddSuccess = false;
        errorMessage = result.data;
      }

      dispatch({
        type: 'REQUEST_SWITCH_ADD',
        isAddSuccess: isAddSuccess,
        switches: undefined,
        page: null,
        errorMessage: errorMessage,
      });

      return result;
    },

    updateSwitch: async data => {
      var result = await dataService.put(
        `api/switches/update/${data.id}`,
        data,
      );

      var isUpdateSuccess = false;
      var errorMessage = null;

      if (result.status == 200) {
        isUpdateSuccess = true;
      } else {
        isUpdateSuccess = false;
        errorMessage = result.data;
      }

      dispatch({
        type: 'REQUEST_SWITCH_UPATE',
        isUpdateSuccess: isUpdateSuccess,
        page: null,
        switches: undefined,
        errorMessage: errorMessage,
      });

      return result;
    },

    deleteSwitch: async data => {
      var numberOfSuccess = 0;
      var isDeleteSuccess = false;
      var errorMessage = null;

      for (var index = 0; index < data.length; index++) {
        var id = data[index];

        var result = await dataService.remove(`api/switches/delete/${id}`);

        if (result.status == 200) {
          numberOfSuccess++;
        } else {
          errorMessage == null
            ? (errorMessage = result.data)
            : errorMessage.concat(result.data);
        }
      }

      if (numberOfSuccess == data.length) {
        isDeleteSuccess = true;
      } else {
        isDeleteSuccess = false;
        errorMessage = result.data;
      }

      dispatch({
        type: 'REQUEST_SWITCH_DELETE',
        isDeleteSuccess: isDeleteSuccess,
        switches: undefined,
        page: null,
        errorMessage: errorMessage,
      });

      return result;
    },

    loadCategoriesData: async () => {
      var categories = await dataService.get(`api/categories/getall`);
      //console.log(categories);
      dispatch({
        type: 'RECEIVE_CATEGORY_FOR_SWITCH',
        categories: categories.data,
      });
    },
  };
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const switchReducer = (state = initialState, action) => {
  if (state === undefined) {
    return unloadedState;
  }
  switch (action.type) {
    case 'RECEIVE_SWITCH':
      return {
        ...state,
        switches: action.switches,
        connection: action.connection,
        proxy: action.proxy,
      };
      break;

    case 'REQUEST_SWITCH_AUTHENTICATED':
      return {
        ...state,
        isUserAuthenticated: action.isUserAuthenticated,
      };
      break;

    case 'REQUEST_SWITCH_ADD':
      return {
        ...state,
        switches: action.switches,
        page: action.page,
        isAddSuccess: action.isAddSuccess,
        errorMessage: action.errorMessage,
      };
      break;

    case 'REQUEST_SWITCH_UPATE':
      return {
        ...state,
        switches: action.switches,
        page: action.page,
        isUpdateSuccess: action.isUpdateSuccess,
        errorMessage: action.errorMessage,
      };
      break;

    case 'REQUEST_SWITCH_DELETE':
      return {
        ...state,
        switches: action.switches,
        page: action.page,
        isDeleteSuccess: action.isDeleteSuccess,
        errorMessage: action.errorMessage,
      };
      break;

    case 'RECEIVE_CATEGORY_FOR_SWITCH':
      return {
        ...state,
        categories: action.categories,
      };
      break;
  }

  return state;
};

// Exports Reducer
export default switchReducer;
