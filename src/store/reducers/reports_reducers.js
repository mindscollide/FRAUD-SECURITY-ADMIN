import * as actions from "../action_types";

const initialState = {
  completeReport: [],
  creditPoliocyReport: [],
  balanceSheetReport: [],
  isLoading: false,
  isSuccess: null,
  isFail: null,
  errorMessage: null,
  isRecordFound: false,
  recordMessage: "",
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COMPLETE_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.COMPLETE_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        completeReport: action.response.responseResult.allIndividualCases,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessage,
      };
    case actions.COMPLETE_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReport: action.response.responseResult,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessagessage,
      };
    case actions.CREDIT_POLICY_REPORT_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case actions.CREDIT_POLICY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        creditPoliocyReport: action.response.responseResult.companyWiseCases,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessagessage,
      };
    case actions.CREDIT_POLICY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessagessage,
      };
    case actions.BALANCE_SHEET_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.BALANCE_SHEET_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        balanceSheetReport: action.response.responseResult.balanceSheetRecords,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessage,
      };
    case actions.BALANCE_SHEET_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        balanceSheetReport: action.response,
      };
    case actions.LOADER_REPORT:
      console.log("reports.isLoading ",action)
      return { ...state, isLoading: action.action };
    default:
      // unchanged reference for actions this slice doesn't handle, so
      // useSelector(state => state.<slice>) doesn't re-render needlessly
      return state;
  }
};

export default reportsReducer;
