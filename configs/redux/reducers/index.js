import { combineReducers } from 'redux';
import reservationReducers from './reservation';
import userReducers from './user';

const reducers = {
  reservation: reservationReducers,
  user: userReducers,
};

export default combineReducers(reducers);
