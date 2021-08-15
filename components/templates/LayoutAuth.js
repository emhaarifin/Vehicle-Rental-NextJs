import Footer from '../organism/Footer';

function LayoutAuth({ children, register }) {
  if (register) {
    return <>{children}</>;
  }
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default LayoutAuth;
