import userCheckReducers from './UserReducer';
import userCategoryReducer from './UserCategoryReducer';
import mainCategoryReducer from './MainCategoryReducer';
import classListReducer from './ClassListReducer';
import calendarReducer from './CalendarReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  userCheckReducers,
  userCategoryReducer,
  mainCategoryReducer,
  classListReducer,
  calendarReducer,
});

export default rootReducer;
