import { Dispatch } from "redux";

export const globalTypes = {
  LOGOUT: 'GLOBAL_LOGOUT'
};

export const logout = () => (dispatch: Dispatch) => {
  dispatch({
    type: globalTypes.LOGOUT
  });
};