import axios from 'axios';
export const addReservation = (data) => (dispatch) => {
  axios
    .post(`http://localhost:4000/reservation`, data)
    .then((result) => {
      const endData = result.data.result[0];
      return dispatch({ type: 'ADD_RESERVATION', payload: endData });
    })
    .catch((error) => {
      return alert(error?.response?.data?.message || 'Gagal');
    });
};
