import { combineReducers } from 'redux';
// import { Reimbursement, ReimbursementStatus, ReimbursementType } from '../models/reimbursement'
// import { Role } from '../models/role';
import { User } from '../models/user';
// import { RouteComponentProps } from 'react-router';
import { loginReducer } from './login.reducer';
import { ReimbursementStatus, ReimbursementType, Reimbursement } from '../models/reimbursement';
import { reimbursementReducer } from './reimbursement.reducer';
import { userReducer } from './user.reducer';

export interface ILoginState {
  currentUser: User;
  message: string;
}

export interface IReimbursementState {
  reimbursements: Reimbursement[];
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
}

export interface IUserState {
  users: User[];
}

export interface IState {
  login: ILoginState;
  reimbursement: IReimbursementState;
  user: IUserState;
}

export const state = combineReducers<IState>({
  login: loginReducer,
  reimbursement: reimbursementReducer,
  user: userReducer
});