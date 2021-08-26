import cookies from 'next-cookies';
export function privateRoute(gssp) {
  return async (context) => {
    const { req, res } = context;
    const roles = cookies(context).roles;
    if (roles !== 'admin') {
      // Redirect to login page
      return {
        redirect: {
          destination: '/',
          statusCode: 302,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
