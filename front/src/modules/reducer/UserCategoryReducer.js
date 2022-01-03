import { MAIN_CATEGORY_REMOVE, MAIN_CATEGORY_ADD } from '../actions/UserCategoryActions';

const testTag = ['여자아이돌', '남자아이돌'];

const userCategoryReducer = (state = testTag, action) => {
  switch (action.type) {
    case MAIN_CATEGORY_ADD:
      return state;

    case MAIN_CATEGORY_REMOVE:
      return state.filter((value) => value !== action.value);

    default:
      return state;
  }
};

export default userCategoryReducer;
