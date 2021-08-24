import { combineReducers } from 'redux';
import vehicleReducers from './vehicle';
import userReducers from './user';

const reducers = combineReducers({
  vehicle: vehicleReducers,
  user: userReducers,
});

export default reducers;
