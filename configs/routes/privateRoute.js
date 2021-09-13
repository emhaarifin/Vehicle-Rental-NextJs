
import cookies from 'next-cookies';
export function privateRoute(getServerSideProps) {
  return async (context) => {
    const token = cookies(context).token
    if(!token) {
      return {
        redirect: {
          permanent: false,
          destination: `/login`,
        },
      };
    }

    return await getServerSideProps(context);
  };
}
