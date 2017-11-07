import {
  GEO_SUCCESS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GEO_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
