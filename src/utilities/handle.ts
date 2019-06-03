import { AxiosError } from "axios";
import { History } from "history";

export const checkPermission = (history: History, error: AxiosError) => {
  if (error.message === 'Request failed with status code 401') {
    history.push('401');
  } else if (error.message === 'Request failed with status code 403') {
    history.push('403');
  } else if (error.message === 'Request failed with status code 400') {
    history.push('400');
  }
}

export const checkStatus = (status: number, history: History) => {
  if ([400, 401, 403].includes(status)) {
    history.push(status.toString());
  }
}

export const checkUserPermission = (history: History, userRole: string, necessaryRole: string[]) => {
  if (!necessaryRole.includes(userRole)) {
    history.push('/');
  }
}