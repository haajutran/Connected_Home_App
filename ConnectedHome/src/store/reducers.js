// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
// import authReducer from './reducers/authReducer';
import authReducer from './Authentication';
import switchReducer from './Switch';
import smartConfigReducer from './SmartConfigStore';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  switchReducer,
  smartConfigReducer,
});

// Exports
export default rootReducer;
