import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SignupReducer from './SignupReducer';
import PlayerReducer from './PlayerReducer';

export default combineReducers({
  auth: AuthReducer,
  signup: SignupReducer,
  users: PlayerReducer
});
