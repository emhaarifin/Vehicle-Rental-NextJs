import { axios } from '@/configs';
import { actionTypes } from '@/configs';
import swal from 'sweetalert';
export const addReservation = (data, router) => (dispatch) => {
  axios
    .post(`/reservation`, data)
    .then((result) => {
      const endData = result.data.result[0];
      router.push(`/payment/${endData.id}`);
      return dispatch({ type: actionTypes.ADD_RESERVATION, payload: endData });
    })
    .catch((error) => {
      console.log(error);
      return alert(error?.response?.data?.message || 'Gagal');
    });
};

export const finishReservation = (id, data, router) => (dispatch) => {
  axios
    .put(`/reservation/${id}`, data)
    .then(async () => {
      console.log(data, 'data finish payment');
      dispatch({ type: actionTypes.FINISH_RESERVATION });
      await swal('success', 'Payment Success', 'success');
      router.push('/history');
    })
    .catch((error) => {
      console.log(error);
      return swal('error', error?.response?.data?.message || 'Gagal', 'error');
    });
};
