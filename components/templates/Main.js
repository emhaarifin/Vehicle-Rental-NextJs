import Footer from '../organism/Footer';

function Main({ children }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}

export default Main;
