// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
// import authReducer from './reducers/authReducer';
import authReducer from './Authentication';
import switchReducer from './Switch';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  switchReducer,
});

// Exports
export default rootReducer;
