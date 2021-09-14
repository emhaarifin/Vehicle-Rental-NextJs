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
    default:
      return state;
  }
};

export default userReducer;
