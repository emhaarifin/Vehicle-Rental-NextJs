import { actionTypes } from '@/configs';
const initialValue = {
  userData: {},
  userDataID: {},
  errorMsg: {},
};
const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...state,
        userData: {},
        userDataID: {},
        errorMsg: {},
      };
    case 'UPDATE_USER':
      return {
        ...state,
      };
    case actionTypes.USER_LOGIN: {
      return {
        ...state,
        userData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
