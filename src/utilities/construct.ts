import { User } from '../models/user';
import { Role } from '../models/role';
import cookies from 'js-cookie';
import { Reimbursement, ReimbursementStatus, ReimbursementType, FullReimbursement } from '../models/reimbursement';

export const getUser = () => {
  let user: User;
  let cookie = cookies.get('user');
  if (typeof(cookie) === 'string') {
    cookie = cookie.substr(2);
    user = JSON.parse(cookie);
  } else {
    user = new User(-1, '', '', '', '', '', new Role(-1, ''));
  }

  return user
}

export const fullReimbursement = (reimbursement: Reimbursement, statuses: ReimbursementStatus[], types: ReimbursementType[]): FullReimbursement => {
  let statusId = reimbursement.status;
  let typeId = reimbursement.type;
  let status = new ReimbursementStatus(-1, '');
  let type = new ReimbursementType(-1, '');
  for (let s of statuses) {
    if (s.statusId === statusId) {
      status = s;
    }
  }
  for (let t of types) {
    if (t.typeId === typeId) {
      type = t;
    }
  }
  return new FullReimbursement(reimbursement.reimbursementId, reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved, reimbursement.description, reimbursement.resolver, status, type);
}