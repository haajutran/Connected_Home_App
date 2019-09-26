import {Action, Reducer} from 'redux';
// import * as signalR from '@aspnet/signalr';
import * as dataService from '../services/DataServices';
import * as constant from '../services/Constant';
import * as authService from '../services/AuthServices';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

const initialState = {
  switches: {
    totalItems: 0,
    items: [],
  },
};

export const actionCreators = {};

// export const signalRLoadData = async (dispatch, getState) => {
//   const {id, switchStatusPage, startDate, endDate} = getState().switchDetail;
//   var switchDetail = await dataService.get(`api/switches/getswitch/${id}`);
//   var switchStatus = await dataService.get(
//     `api/switchstatuses/getall?mainswitchid=${id}&page=${switchStatusPage}&pagesize=10&startDate=${startDate}&endDate=${endDate}`,
//   );

//   dispatch({
//     type: 'REQUEST_SWITCH_DETAIL_SIGNALR_UPDATE',
//     switchDetail: switchDetail.data,
//     switchStatus: switchStatus.data,
//   });
// };

export const mapStateToProps = state => {
  return {
    switches: state.switchReducer.switches,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
export const mapDispatchToProps = dispatch => {
  // Action
  return {
    // loadSwitchDetailData: async id => {
    //   // Only load data if it's something we don't already have (and are not already loading)
    //   const appState = getState();

    //   if (
    //     appState &&
    //     appState.switchDetail &&
    //     id != null &&
    //     id != appState.switchDetail.id
    //   ) {
    //     var switchDetail = await dataService.get(
    //       `api/switches/getswitch/${id}`,
    //     );

    //     if (switchDetail.status == 200) {
    //       var categories = await dataService.get(`api/categories/getall`);

    //       var hubConnection = new signalR.HubConnectionBuilder()
    //         .withUrl('/hub')
    //         .build();
    //       console.log(switchDetail.data.code + '/UpdateSubSwitch');
    //       hubConnection.on(switchDetail.data.code + '/UpdateSubSwitch', () => {
    //         console.log('receive');
    //         signalRLoadData(dispatch, getState);
    //       });

    //       hubConnection
    //         .start()
    //         .then(() => {
    //           console.log('Hub connection started');
    //         })
    //         .catch(err => {
    //           console.log('Error while establishing connection');
    //         });

    //       dispatch({
    //         type: 'RECEIVE_SWITCH_DETAIL',
    //         switchDetail: switchDetail.data,
    //         id: id,
    //         categories: categories.data,
    //         hubConnection: hubConnection,
    //       });
    //     } else if (switchDetail.status == 404) {
    //       dispatch({
    //         type: 'REQUEST_SWITCH_DETAIL_ERROR',
    //         errorMessage:
    //           'Không tìm thấy switch tương ứng. Vui lòng kiểm tra lại.',
    //       });
    //     }
    //   }
    // },

    loadSwitchStatusData: async (id, page, startDate, endDate) => {
      // Only load data if it's something we don't already have (and are not already loading)

      if (page == null) {
        page = 1;
      }

      var switchStatus = await dataService.get(
        `api/switchstatuses/getall?mainswitchid=${id}&page=${page}&pagesize=10&startDate=${startDate}&endDate=${endDate}`,
      );

      if (switchStatus.status == 200) {
        dispatch({
          type: 'RECEIVE_SWITCH_STATUS',
          switchStatus: switchStatus.data,
          switchStatusPage: page,
          isSwitchStatusAddSuccess: null,
          startDate: startDate,
          endDate: endDate,
        });
      } else if (switchStatus.status == 404) {
        dispatch({
          type: 'REQUEST_SWITCH_DETAIL_ERROR',
          errorMessage: switchStatus.data,
        });
      }
    },

    addSwitchStatus: async switchStatus => {
      // const appState = getState();
      try {
        var res = await dataService.post(
          `api/switchstatuses/add`,
          switchStatus,
        );
        console.log(res);
        return res;
      } catch (e) {
        console.log(e.response);
      }
    },

    updateSwitchDetail: async data => {
      console.log(data);
      var result = await dataService.put(
        `api/switches/update/${data.id}`,
        data,
      );
      console.log(result);
      var isUpdateSuccess = false;
      var errorMessage = null;

      if (result.status == 200) {
        isUpdateSuccess = true;
        dispatch({
          type: 'REQUEST_SWITCH_DETAIL_UPATE',
          errorMessage: errorMessage,
          isUpdateSuccess: isUpdateSuccess,
          switchDetail: result.data,
        });
      } else {
        errorMessage = result.data;
        dispatch({
          type: 'REQUEST_SWITCH_DETAIL_ERROR',
          errorMessage: errorMessage,
        });
      }
      return result;
    },
  };
};

export const switchReducer = (state, action) => {
  if (state === undefined) {
    return unloadedState;
  }
  switch (action.type) {
    case 'REQUEST_SWITCH':
      return {
        ...state,
        isLoading: true,
      };
    case 'RECEIVE_SWITCH':
      return {
        ...state,
        isLoading: false,
        switches: action.switches,
      };
    case 'RECEIVE_SWITCH_DETAIL':
      return {
        ...state,
        switchDetail: action.switchDetail,
        id: action.id,
        categories: action.categories,
        hubConnection: action.hubConnection,
      };

    case 'RECEIVE_SWITCH_STATUS':
      return {
        ...state,
        switchStatus: action.switchStatus,
        switchStatusPage: action.switchStatusPage,
        isSwitchStatusAddSuccess: action.isSwitchStatusAddSuccess,
        startDate: action.startDate,
        endDate: action.endDate,
      };

    case 'REQUEST_SWITCH_DETAIL_UPATE':
      return {
        ...state,
        isUpdateSuccess: action.isUpdateSuccess,
        errorMessage: action.errorMessage,
        switchDetail: action.switchDetail,
      };

    case 'REQUEST_SWITCH_STATUS_ADD':
      return {
        ...state,
        errorMessage: action.errorMessage,
        switchDetail: action.switchDetail,
        isSwitchStatusAddSuccess: action.isSwitchStatusAddSuccess,
      };

    case 'REQUEST_SWITCH_DETAIL_ERROR':
      return {
        ...state,
        errorMessage: action.errorMessage,
      };

    case 'REQUEST_SWITCH_DETAIL_AUTHENTICATED':
      return {
        ...state,
        isUserAuthenticated: action.isUserAuthenticated,
      };

    case 'REQUEST_SWITCH_DETAIL_SIGNALR_UPDATE':
      return {
        ...state,
        switchStatus: action.switchStatus,
        switchDetail: action.switchDetail,
      };
  }

  return state;
};

// Exports Reducer
export default switchReducer;
