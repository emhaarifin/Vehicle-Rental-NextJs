import { axios, actionTypes } from '@/configs';
import swal from 'sweetalert';

export const generateCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const Logout = () => ({
  type: 'LOGOUT',
});

export const login = (data, router, resetForm) => (dispatch) => {
  axios
    .post('/auth/login', data, { withCredentials: true })
    .then(async (result) => {
      const resData = result.data.result;
      const { roles, avatar, id, token } = resData[0];
      localStorage.setItem('isAuth', true);
      localStorage.setItem('roles', roles);
      localStorage.setItem('avatar', avatar);
      localStorage.setItem('id', id);
      generateCookie('avatar', avatar, 1);
      generateCookie('token', token, 1);
      generateCookie('roles', roles, 1);
      generateCookie('id', id, 1);
      dispatch({ type: actionTypes.USER_LOGIN, payload: resData });
      router.push('/');
      resetForm();
    })
    .catch((error) => {
      dispatch({ type: actionTypes.EROR_LOGIN, payload: error?.response?.data?.message });
      swal('Opps...', error?.response?.data?.message || 'Login Gagal nih', 'error');
    });
};

export const register = (data, router, resetForm) => () => {
  axios
    .post('/auth/register', data)
    .then(async (result) => {
      await swal('Success', result?.data?.message || 'Signup Sukses', 'success');
      router.push('/login');
      resetForm();
    })
    .catch((error) => {
      swal('Opps...', error?.response?.data?.message || 'Signup Gagal nih', 'error');
    });
};

export const updateProfile = (user, id) => (dispatch) => {
  const data = new FormData();
  data.append('phone_number', user.phone_number);
  data.append('gender', user.gender);
  data.append('adress', user.adress);
  // data.append('date_of_birth', user.date_of_birth);
  data.append('image', user.image);

  axios
    .put(`/auth/profile/update/${id}`, user, {
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

export const getUserById = (id) => (dispatch) => {
  axios
    .get(`/auth/profile/${id}`)
    .then((result) => {
      const DataUser = result.data.result;
      dispatch({ type: actionTypes.GET_USER, payload: DataUser });
    })
    .catch((error) => {
      swal('error', error?.response?.data?.message || 'Gagal Update ', 'error');
    });
};
