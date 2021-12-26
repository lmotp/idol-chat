import userCheckReducers from './UserReducer';
import userCategoryReducer from './UserCategoryReducer';
import mainCategoryReducer from './MainCategoryReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  userCheckReducers,
  userCategoryReducer,
  mainCategoryReducer,
});

export default rootReducer;
