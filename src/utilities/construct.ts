import { User } from '../models/user';
import { Role } from '../models/role';
import cookies from 'js-cookie';

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