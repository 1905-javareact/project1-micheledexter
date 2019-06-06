import { Dispatch } from "redux";
import { apiClient } from "../axios/user-api-client";
import { ReimbursementStatus, Reimbursement, ReimbursementType } from "../models/reimbursement";

export const reimbursementTypes = {
  UPDATE_REIMBURSEMENTS_BY_STATUS_SUCCEEDED: 'R*T_UPDATE_REIMBURSEMENTS_BY_STATUS_SUCCEEDED',
  UPDATE_REIMBURSEMENTS_BY_STATUS_FAILED: 'R*T_UPDATE_REIMBURSEMENTS_BY_STATUS_FAILED',
  UPDATE_REIMBURSEMENTS_BY_AUTHOR_SUCCEEDED: 'R*T_UPDATE_REIMBURSEMENTS_BY_AUTHOR_SUCCEEDED',
  UPDATE_REIMBURSEMENTS_BY_AUTHOR_FAILED: 'R*T_UPDATE_REIMBURSEMENTS_BY_AUTHOR_FAILED',
  UPDATE_REIMBURSEMENT_STATUSES_SUCCEEDED: 'R*T_UPDATE_REIMBURSEMENT_STATUSES_SUCCEEDED',
  UPDATE_REIMBURSEMENT_STATUSES_FAILED: 'R*T_UPDATE_REIMBURSEMENT_STATUSES_FAILED',
  UPDATE_REIMBURSEMENT_TYPES_SUCCEEDED: 'R*T_UPDATE_REIMBURSEMENT_TYPES_SUCCEEDED',
  UPDATE_REIMBURSEMENT_TYPES_FAILED: 'R*T_UPDATE_REIMBURSEMENT_TYPES_FAILED'
};

export const fetchReimbursementByStatusId = (id: number) => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient(`/reimbursements/status/${typeof id === 'number' ? id : -1}`);

    if (response.status === 200) {
      const reimbursements: Reimbursement[] = response.data;
      dispatch({
        type: reimbursementTypes.UPDATE_REIMBURSEMENTS_BY_STATUS_SUCCEEDED,
        payload: {
          reimbursements: reimbursements
        }
      });
    } else {
      dispatch({
        type: reimbursementTypes.UPDATE_REIMBURSEMENTS_BY_STATUS_FAILED
      });
    }
  } catch(err) {
    console.log(`Something went wrong: ${err}`);
  }
}

export const fetchReimbursementByAuthorId = (id: number) => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient(`/reimbursements/author/userId/${typeof id === 'number' ? id : -1}`);

    if (response.status === 200) {
      const reimbursements: Reimbursement[] = response.data;
      dispatch({
        type: reimbursementTypes.UPDATE_REIMBURSEMENTS_BY_AUTHOR_SUCCEEDED,
        payload: {
          reimbursements: reimbursements
        }
      });
    } else {
      dispatch({
        type: reimbursementTypes.UPDATE_REIMBURSEMENTS_BY_AUTHOR_FAILED
      });
    }
  } catch(err) {
    console.log(`Something went wrong: ${err}`);
  }
}

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
      const types: ReimbursementType[] = response.data;
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