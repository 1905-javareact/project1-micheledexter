import { IUserState } from ".";
import { userTypes } from "../actions/user.actions";

const initialState: IUserState = {
  users: []
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case (userTypes.UPDATE_USERS_SUCCEEDED):
      return {
        users: action.payload.users
      }
    
    case (userTypes.UPDATE_USERS_FAILED):
      return {
        ...state
      }
    
    default:
  }
  
  return state;
}