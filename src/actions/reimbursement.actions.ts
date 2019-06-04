import { Dispatch } from "redux";
import { apiClient } from "../axios/user-api-client";
import { ReimbursementStatus } from "../models/reimbursement";

export const reimbursementTypes = {
  UPDATE_REIMBURSEMENT_STATUSES_SUCCEEDED: 'REIMBURSEMENT_UPDATE_REIMBURSEMENT_STATUSES_SUCCEEDED',
  UPDATE_REIMBURSEMENT_STATUSES_FAILED: 'REIMBURSEMENT_UPDATE_REIMBURSEMENT_STATUSES_FAILED',
  UPDATE_REIMBURSEMENT_TYPES_SUCCEEDED: 'REIMBURSEMENT_UPDATE_REIMBURSEMENT_TYPES_SUCCEEDED',
  UPDATE_REIMBURSEMENT_TYPES_FAILED: 'REIMBURSEMENT_UPDATE_REIMBURSEMENT_TYPES_FAILED'
};

export const fetchReimbursementStatuses = () => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient('/reimbursement-status');
    
    if (response.status === 200) {
      const statuses: ReimbursementStatus[] = response.data;
      dispatch({
        type: reimbursementTypes.UPDATE_REIMBURSEMENT_STATUSES_SUCCEEDED,
        payload: {
          statuses: statuses
        }
      });
    } else {
      dispatch({
        type: reimbursementTypes.UPDATE_REIMBURSEMENT_STATUSES_FAILED
      });
    }
  } catch(err) {
    console.log(`Something went wrong: ${err}`);
  }
};

export const fetchReimbursementTypes = () => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient('/reimbursement-type');
    
    if (response.status === 200) {
      const types: ReimbursementStatus[] = response.data;
      dispatch({
        type: reimbursementTypes.UPDATE_REIMBURSEMENT_TYPES_SUCCEEDED,
        payload: {
          types: types
        }
      });
    } else {
      dispatch({
        type: reimbursementTypes.UPDATE_REIMBURSEMENT_TYPES_FAILED
      });
    }
  } catch(err) {
    console.log(`Something went wrong: ${err}`);
  }
};