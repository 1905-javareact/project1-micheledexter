import { History } from "history";
import { Dispatch } from "redux";
import axios, { AxiosResponse } from 'axios';
import { User } from "../models/user";
import { checkPermission } from "../utilities/handle";
import { apiClient } from "../axios/user-api-client";

export const loginTypes = {
  INVALID_CREDENTIALS: 'LOGIN_INVALID_CREDENTIALS',
  FAILED_LOGIN: 'LOGIN_FAILED_LOGIN',
  SUCCESSFUL_LOGIN: 'LOGIN_SUCCESSFUL_LOGIN'
}

export const login = (username: string, password: string, history: History) => async (dispatch: Dispatch) => {
  const credentials = {
    username,
    password
  }

  try {
    const response = await apiClient.post('/login', credentials);

    if (response.status === 401) {
      dispatch({
        type: loginTypes.INVALID_CREDENTIALS
      });
    } else if (response.status === 200) {
      const user: User = await response.data;
      dispatch({
        payload: {
          user: user
        },
        type: loginTypes.SUCCESSFUL_LOGIN
      });
      history.push('/dashboard/' + user.role.role);
    } else {
      dispatch({
        type: loginTypes.FAILED_LOGIN
      });
    }
  } catch(err) {
    checkPermission(history, err);
  }
};

