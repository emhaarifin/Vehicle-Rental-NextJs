import cookies from 'next-cookies';

export function privateRouteAdmin(getServerSideProps) {
  return async (context) => {
    const token = cookies(context).token;
    const role = cookies(context).user_role;
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: `/login`,
        },
      };
    } else if (token && role !== 'admin') {
      return {
        redirect: {
          permanent: false,
          destination: `/`,
        },
      };
    }

    return await getServerSideProps(context);
  };
}
