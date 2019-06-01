import { combineReducers } from 'redux';
// import { Reimbursement, ReimbursementStatus, ReimbursementType } from '../models/reimbursement'
// import { Role } from '../models/role';
import { User } from '../models/user';
// import { RouteComponentProps } from 'react-router';
import { loginReducer } from './login.reducer';

export interface ILoginState {
  currentUser: User;
  message: string;
}

export interface IState {
  login: ILoginState;
}

export const state = combineReducers<IState>({
  login: loginReducer
});