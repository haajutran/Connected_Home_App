// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
// import authReducer from './reducers/authReducer';
import authReducer from './Authentication';
import smartConfigReducer from './SmartConfigStore';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  smartConfigReducer,
});

// Exports
export default rootReducer;
