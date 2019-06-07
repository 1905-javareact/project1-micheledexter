import { IReimbursementState } from ".";
import { reimbursementTypes } from "../actions/reimbursement.actions";
import { globalTypes } from "../actions/global.actions";

const initialState: IReimbursementState = {
  reimbursements: [],
  statuses: [],
  types: []
};

export const reimbursementReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case(reimbursementTypes.UPDATE_REIMBURSEMENT_SUCCEEDED):
    return {
      ...state,
      reimbursements: action.payload.reimbursements
    }

    case (reimbursementTypes.UPDATE_REIMBURSEMENT_FAILED):
      return {
        ...state
      }

    case (reimbursementTypes.UPDATE_REIMBURSEMENTS_BY_STATUS_SUCCEEDED):
      return {
        ...state,
        reimbursements: action.payload.reimbursements
      }

    case (reimbursementTypes.UPDATE_REIMBURSEMENTS_BY_STATUS_FAILED):
      return {
        ...state
      }

    case (reimbursementTypes.UPDATE_REIMBURSEMENTS_BY_AUTHOR_SUCCEEDED):
      return {
        ...state,
        reimbursements: action.payload.reimbursements
      }
    
    case (reimbursementTypes.UPDATE_REIMBURSEMENTS_BY_AUTHOR_FAILED):
      return {
        ...state
      }

    case (reimbursementTypes.UPDATE_REIMBURSEMENT_STATUSES_SUCCEEDED):
      return {
        ...state,
        statuses: action.payload.statuses
      }

    case (reimbursementTypes.UPDATE_REIMBURSEMENT_STATUSES_FAILED): 
      return {
        ...state
      }
    
    case (reimbursementTypes.UPDATE_REIMBURSEMENT_TYPES_SUCCEEDED):
      return {
        ...state,
        types: action.payload.types
      }

    case (reimbursementTypes.UPDATE_REIMBURSEMENT_TYPES_FAILED):
      return {
        ...state
      }

    case (globalTypes.LOGOUT):
      return {
        reimbursements: initialState.reimbursements,
        statuses: initialState.statuses,
        types: initialState.types
      }

    default:
  }

  return state;
}