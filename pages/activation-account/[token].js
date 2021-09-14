/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import swal from 'sweetalert';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { axios, publicRoute } from '@/configs';
function activation() {
  // const Success = async () => {
  // };
  // useEffect(() => {
  //   Success();
  // }, []);

  return <></>;
}

export default activation;

export const getServerSideProps = publicRoute(async (context) => {
  const token = context.params.token;
  axios
    .get(`/auth/activation/${token}`)
    .then(async () => {
      await swal('Success', 'Suskes Verifikasi Email', 'success');
    })
    .catch(async () => {
      await swal('Opss...', 'eror', 'error');
    });
  return {
    props: {},
  };
});
