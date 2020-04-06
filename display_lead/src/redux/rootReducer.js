import { reduxTypes } from "./reduxTypes";
const INITIAL_STATE = {
  isLoggedIn: false,
  userData: "",
  isPending: false,
  errorLogging: ""
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case reduxTypes.REQUEST_LOGIN_PENDING:
      return {
        ...state,
        isPending: true
      };
    case reduxTypes.REQUEST_LOGIN_FAILED:
      return {
        ...state,
        errorLogging: action.payload
      };
    case reduxTypes.REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        isPending: false,
        isLoggedIn: true,
        errorLogging: "",
        userData: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
