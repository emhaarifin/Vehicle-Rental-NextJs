// INCREMENT COUNTER BY 1
import axios from 'axios';
import swal from 'sweetalert';
export const incrementCount = () => ({ type: 'types.INCREMENT' });

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: 'types.DECREMENT' });

export const Logout = () => ({
  type: 'LOGOUT',
});

export const updateProfile = (user, id) => (dispatch) => {
  const data = new FormData();
  data.append('phone_number', user.phone_number);
  data.append('gender', user.gender);
  data.append('adress', user.adress);
  // data.append('date_of_birth', user.date_of_birth);
  data.append('image', user.image);

  console.log(id, user, 'aa');
  axios
    .put(`http://localhost:4000/auth/profile/update/${id}`, user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((result) => {
      dispatch({ type: 'UPDATE_USER' });
      swal('Success', result?.data?.message || 'Suskes Update Data', 'success');
    })
    .catch((error) => {
      swal('error', error?.response?.data?.message || 'Gagal Update ', 'error');
    });
};
