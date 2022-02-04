import userCheckReducers from './UserReducer';
import userCategoryReducer from './UserCategoryReducer';
import mainCategoryReducer from './MainCategoryReducer';
import classListReducer from './ClassListReducer';
import chatMemberReducer from './ChatMemberReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  userCheckReducers,
  userCategoryReducer,
  mainCategoryReducer,
  classListReducer,
  chatMemberReducer,
});

export default rootReducer;
