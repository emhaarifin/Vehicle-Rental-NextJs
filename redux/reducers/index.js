import { combineReducers } from 'redux';
import vehicleReducers from './vehicle';
import userReducers from './user';

const reducers = {
  // vehicle: vehicleReducers,
  user: userReducers,
};

export default combineReducers(reducers);
