import { Dispatch } from "redux";
import { apiClient } from "../axios/user-api-client";
import { User } from "../models/user";

export const userTypes = {
  UPDATE_USERS_SUCCEEDED: 'USERS_UPDATE_USERS_SUCCEEDED',
  UPDATE_USERS_FAILED: 'USERS_UPDATE_USERS_FAILED'
};

export const fetchUsers = () => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient('/users');

    if (response.status === 200) {
      const users: User[] = response.data;
      dispatch({
        type: userTypes.UPDATE_USERS_SUCCEEDED,
        payload: {
          users: users
        }
      });
    } else {
      dispatch({
        type: userTypes.UPDATE_USERS_FAILED
      });
    }
  } catch(err) {
    console.log(`Something went wrong: ${err}`);
  }
};