import { Dispatch } from "redux";
import { apiClient } from "../axios/user-api-client";
import { ReimbursementStatus, Reimbursement, ReimbursementType, FullReimbursement } from "../models/reimbursement";
import { fullReimbursement } from "../utilities/construct";

export const reimbursementTypes = {
  UPDATE_REIMBURSEMENT_SUCCEEDED: 'R*T_UPDATE_REIMBURSEMENT_SUCCEEDED',
  UPDATE_REIMBURSEMENT_FAILED: 'R*T_UPDATE_REIMBURSEMENT_FAILED',
  UPDATE_REIMBURSEMENTS_BY_STATUS_SUCCEEDED: 'R*T_UPDATE_REIMBURSEMENTS_BY_STATUS_SUCCEEDED',
  UPDATE_REIMBURSEMENTS_BY_STATUS_FAILED: 'R*T_UPDATE_REIMBURSEMENTS_BY_STATUS_FAILED',
  UPDATE_REIMBURSEMENTS_BY_AUTHOR_SUCCEEDED: 'R*T_UPDATE_REIMBURSEMENTS_BY_AUTHOR_SUCCEEDED',
  UPDATE_REIMBURSEMENTS_BY_AUTHOR_FAILED: 'R*T_UPDATE_REIMBURSEMENTS_BY_AUTHOR_FAILED',
  UPDATE_REIMBURSEMENT_STATUSES_SUCCEEDED: 'R*T_UPDATE_REIMBURSEMENT_STATUSES_SUCCEEDED',
  UPDATE_REIMBURSEMENT_STATUSES_FAILED: 'R*T_UPDATE_REIMBURSEMENT_STATUSES_FAILED',
  UPDATE_REIMBURSEMENT_TYPES_SUCCEEDED: 'R*T_UPDATE_REIMBURSEMENT_TYPES_SUCCEEDED',
  UPDATE_REIMBURSEMENT_TYPES_FAILED: 'R*T_UPDATE_REIMBURSEMENT_TYPES_FAILED'
};

export const updateReimbursement = (reimbursement: Reimbursement, type: string, typeId: number, statuses: ReimbursementStatus[], types: ReimbursementType[]) => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient.patch(`/reimbursements`, reimbursement);

    if (response.status === 200) {
      let queryStr: string = '';
      if (type === 'status') {
        queryStr = `/reimbursements/status/${typeId}`;
      } else if (type === 'author') {
        queryStr = `/reimbursements/author/userId/${typeId}`;
      }
      const res = await apiClient(queryStr);

      if (res.status === 200) {
        let reimbursements: FullReimbursement[] = [];
        let raw: Reimbursement[] = res.data;
        for (let item of raw) {
          reimbursements.push(fullReimbursement(item, statuses, types));
        }
        dispatch({
          type: reimbursementTypes.UPDATE_REIMBURSEMENT_SUCCEEDED,
          payload: {
            reimbursements: reimbursements
          }
        });
      } else {
        dispatch({
          type: reimbursementTypes.UPDATE_REIMBURSEMENT_FAILED
        });
      }
    }
  } catch(err) {
    console.log(`Something went wrong: ${err}`);
  }
}

export const fetchReimbursementsByStatusId = (id: number, statuses: ReimbursementStatus[], types: ReimbursementType[]) => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient(`/reimbursements/status/${id}`);

    if (response.status === 200) {
      let reimbursements: FullReimbursement[] = [];
      let raw: Reimbursement[] = response.data;
      for (let item of raw) {
        reimbursements.push(fullReimbursement(item, statuses, types));
      }
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

export const fetchReimbursementsByAuthorId = (id: number, statuses: ReimbursementStatus[], types: ReimbursementType[]) => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient(`/reimbursements/author/userId/${id}`);

    if (response.status === 200) {
      let reimbursements: FullReimbursement[] = [];
      let raw: Reimbursement[] = response.data;
      for (let item of raw) {
        reimbursements.push(fullReimbursement(item, statuses, types));
      }
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