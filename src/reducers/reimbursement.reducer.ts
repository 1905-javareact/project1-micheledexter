import { IReimbursementState } from ".";
import { reimbursementTypes } from "../actions/reimbursement.actions";
import { globalTypes } from "../actions/global.actions";

const initialState: IReimbursementState = {
  statuses: [],
  types: []
};

export const reimbursementReducer = (state = initialState, action: any) => {
  switch (action.type) {
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
        statuses: initialState.statuses,
        types: initialState.types
      }

    default:
  }

  return state;
}