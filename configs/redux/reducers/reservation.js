const initialValue = {
  data: [],
};

const reservationReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'ADD_RESERVATION':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reservationReducer;
