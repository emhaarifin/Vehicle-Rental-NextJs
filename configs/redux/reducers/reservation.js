import { actionTypes } from '@/configs';
const initialValue = {
  data: [],
};

const reservationReducer = (state = initialValue, action) => {
  switch (action.type) {
    case actionTypes.ADD_RESERVATION:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.FINISH_RESERVATION:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};

export default reservationReducer;
