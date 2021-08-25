export function requireAuthentication(gssp) {
  return async (context) => {
    const { req, res } = context;
    const token = req.headers.cookie; // Add logic to extract token from `req.headers.cookie`

    if (!token) {
      // Redirect to login page
      return {
        redirect: {
          destination: '/login',
          statusCode: 302,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
