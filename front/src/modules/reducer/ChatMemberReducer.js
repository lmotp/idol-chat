import { MENU_TOGGLE_STATE } from '../actions/MemberListAction';

const ListState = false;

const chatMemberReducer = (state = ListState, action) => {
  switch (action.type) {
    case MENU_TOGGLE_STATE:
      return !state;

    default:
      return state;
  }
};

export default chatMemberReducer;
