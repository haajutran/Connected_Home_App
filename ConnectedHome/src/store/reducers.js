// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
// import authReducer from './reducers/authReducer';
import authReducer from './Authentication';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
});

// Exports
export default rootReducer;
