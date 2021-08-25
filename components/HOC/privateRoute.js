export function privateRoute(gssp) {
  return async (context) => {
    const { req, res } = context;
    let roles = req.headers.cookie; // Add logic to extract token from `req.headers.cookie`
    // const roles = req.headers.roles;
    roles = roles.split('; ')[1].slice(6);
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
