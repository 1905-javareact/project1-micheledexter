import { ILoginState, state } from '.';
import { loginTypes } from '../actions/login.actions';
import { User } from '../models/user';
import { Role } from '../models/role';

const initialState: ILoginState = {
  currentUser: new User(-1, '', '', '', '', '', new Role(-1, '')),
  message: ''
};

export const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case (loginTypes.INVALID_CREDENTIALS):
      return {
        ...state,
        message: 'Invalid Credentials'
      }
      break;

    case (loginTypes.FAILED_LOGIN):
      return {
        ...state,
        message: "Failed to log in... You broke something, didn't you?"
      }
      break;

    case (loginTypes.SUCCESSFUL_LOGIN):
      return {
        ...state,
        currentUser: action.payload.user,
        message: 'Login Successful'
      }
      break;

    default:
  }

  return state;
}