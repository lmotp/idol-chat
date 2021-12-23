import userCheckReducers from './UserReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  userCheckReducers,
});

export default rootReducer;
