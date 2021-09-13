import { Footer } from '@/components';

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
