import { Footer, Navbar } from '@/components';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';

function Main({ children, avatar }) {
  return (
    <MainC>
      <Navbar avatar={avatar} />
      <ContainerMain>{children}</ContainerMain>
      <Footer />
    </MainC>
  );
}

export default Main;

const MainC = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const ContainerMain = styled.div`
  padding: 5rem;
  padding-top: 1rem;
  margin: 0 auto;
  ${customMedia.lessThan('media_sm')`
  padding: 1rem;
`}
`;
