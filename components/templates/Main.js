import Footer from '../organism/Footer';
import Navbar from '../organism/Navbar';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';

function Main({ children }) {
  return (
    <>
      <Navbar />
      <ContainerMain>{children}</ContainerMain>
      <Footer />
    </>
  );
}

export default Main;

const ContainerMain = styled.div`
  padding: 5rem;
  padding-top: 1rem;
  margin: 0 auto;
  ${customMedia.lessThan('media_sm')`
  padding: 1rem;
`}
`;
