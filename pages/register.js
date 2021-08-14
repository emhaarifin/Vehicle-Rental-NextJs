import Main from '../components/templates/Main';

import styled from 'styled-components';
import heroSignup from '../public/asset/images/hero-signup.svg';
import Image from 'next/image';
function Login() {
  return (
    <Main>
      <RegisterLayout>
        <div className="left">
          <div className="custom-hero">
            <Image src={heroSignup} alt="hero signup" layout="fill" objectFit="cover" id="hero-signup"></Image>
          </div>
        </div>
        <div className="right">Tes</div>
      </RegisterLayout>
    </Main>
  );
}

export default Login;

const RegisterLayout = styled.div`
  display: flex;
  .left {
    flex: 1;
    height: 100%;
    width: 100%;
    position: relative;
    .custom-hero {
      width: 50vw;
      min-height: 100vw;
    }
  }
  .right {
    flex: 1;
  }
`;
