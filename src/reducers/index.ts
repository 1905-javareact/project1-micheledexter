import { combineReducers } from 'redux';
// import { Reimbursement, ReimbursementStatus, ReimbursementType } from '../models/reimbursement'
// import { Role } from '../models/role';
import { User } from '../models/user';
// import { RouteComponentProps } from 'react-router';
import { loginReducer } from './login.reducer';
import { ReimbursementStatus, ReimbursementType } from '../models/reimbursement';
import { reimbursementReducer } from './reimbursement.reducer';

export interface ILoginState {
  currentUser: User;
  message: string;
}

export interface IReimbursementState {
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
}

export interface IState {
  login: ILoginState;
  reimbursement: IReimbursementState;
}

export const state = combineReducers<IState>({
  login: loginReducer,
  reimbursement: reimbursementReducer
});