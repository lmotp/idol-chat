import { CLASS_JOIN_STATE } from '../actions/ClassJoinAction';

const joinState = false;

const classJoinReducer = (state = joinState, action) => {
  switch (action.type) {
    case CLASS_JOIN_STATE:
      return !state;

    default:
      return state;
  }
};

export default classJoinReducer;
