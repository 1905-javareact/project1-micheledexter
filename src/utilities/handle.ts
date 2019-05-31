import { AxiosError } from "axios";

export const checkPermission = (props: any, error: AxiosError) => {
  if (error.message === 'Request failed with status code 401') {
    props.history.push('401');
  } else if (error.message === 'Request failed with status code 403') {
    props.history.push('403');
  }
}