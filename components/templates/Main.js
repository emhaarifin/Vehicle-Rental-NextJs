import Footer from '../organism/Footer';
import Navbar from '../organism/Navbar';

function Main({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Main;
