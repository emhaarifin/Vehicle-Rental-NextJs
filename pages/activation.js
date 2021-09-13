/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import swal from 'sweetalert';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
function activation() {
  const router = useRouter();
  const Success = () => {
    swal('Success', 'Suskes Verifikasi Email', 'success');
    router.push('/login');
  };
  useEffect(() => {
    Success();
  }, []);

  return <></>;
}

export default activation;
