import Footer from '../organism/Footer';
import Navbar from '../organism/Navbar';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';

function Main({ children, avatar }) {
  console.log(avatar, 'avatar');
  return (
    <MainC>
      <Navbar />
      <ContainerMain>{children}</ContainerMain>
      <Footer />
    </MainC>
  );
}

export default Main;

const MainC = styled.div`
  max-width: 1440px;
  // padding: 5rem;
  //   padding-top: 1rem;
  margin: 0 auto;
  //   ${customMedia.lessThan('media_sm')`
//   padding: 1rem;
// `}
`;

const ContainerMain = styled.div`
  padding: 5rem;
  padding-top: 1rem;
  margin: 0 auto;
  ${customMedia.lessThan('media_sm')`
  padding: 1rem;
`}
`;
