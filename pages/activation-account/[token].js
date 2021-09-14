/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import swal from 'sweetalert';
import Router from 'next/router';
import { axios, publicRoute } from '@/configs';
function activation() {
  return <></>;
}

export default activation;

export const getServerSideProps = publicRoute(async (context) => {
  const token = context.params.token;
  axios
    .get(`/auth/activation/${token}`)
    .then(async (result) => {
      console.log(result, ' ini res');
      await swal('Success', 'Suskes Verifikasi Email', 'success');
      context.res.writeHead(307, {
        Location: `https://vehicle-rental-next-js.vercel.app/`,
      });
    })
    .catch(async (error) => {
      console.log(error, 'ini eror');
      await swal('Opss...', 'eror', 'error');
    });
  return {
    props: {},
  };
});
