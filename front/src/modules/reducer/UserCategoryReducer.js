import { MAIN_CATEGORY_REMOVE, MAIN_CATEGORY_ADD } from '../actions/UserCategoryActions';

const testTag = ['남자아이돌', '여자아이돌'];

const userCategoryReducer = (state = testTag, action) => {
  switch (action.type) {
    case MAIN_CATEGORY_ADD:
      return [...state, action.value];

    case MAIN_CATEGORY_REMOVE:
      return state.filter((value) => value !== action.value);

    default:
      return state;
  }
};

export default userCategoryReducer;
