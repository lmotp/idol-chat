import { CATEGORY_CHANGE } from '../actions/UserCategoryActions';

const testTag = '전체';

const userCategoryReducer = (state = testTag, action) => {
  switch (action.type) {
    case CATEGORY_CHANGE:
      return (state = action.value);

    default:
      return state;
  }
};

export default userCategoryReducer;
