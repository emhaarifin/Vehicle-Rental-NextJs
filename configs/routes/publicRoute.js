import cookies from 'next-cookies';

export function publicRoute(getServerSideProps) {
  return async (context) => {
    const token = cookies(context).token;
    if (token) {
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
