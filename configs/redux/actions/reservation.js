import { axios } from '@/configs';
export const addReservation = (data) => (dispatch) => {
  axios
    .post(`/reservation`, data)
    .then((result) => {
      const endData = result.data.result[0];
      return dispatch({ type: 'ADD_RESERVATION', payload: endData });
    })
    .catch((error) => {
      return alert(error?.response?.data?.message || 'Gagal');
    });
};
