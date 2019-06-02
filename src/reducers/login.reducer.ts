import { ILoginState } from '.';
import { loginTypes } from '../actions/login.actions';
import { User } from '../models/user';
import { getUser } from '../utilities/construct';

let user: User = getUser();

const initialState: ILoginState = {
  currentUser: user,
  message: ''
};

export const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case (loginTypes.INVALID_CREDENTIALS):
      return {
        ...state,
        message: 'Invalid Credentials'
      }

    case (loginTypes.FAILED_LOGIN):
      return {
        ...state,
        message: "Failed to log in... You broke something, didn't you?"
      }

    case (loginTypes.SUCCESSFUL_LOGIN):
      return {
        ...state,
        currentUser: action.payload.user,
        message: 'Login Successful'
      }

    default:
  }

  return state;
}