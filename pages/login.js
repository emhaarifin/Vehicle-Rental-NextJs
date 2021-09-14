import styled from 'styled-components';
import Image from 'next/image';
import { Button, Input, LayoutAuth } from '@/components';
import { axios, publicRoute } from '@/configs';
import { heroLogin, google } from '@/asset';
import { customMedia } from '../styles/breakpoint';
import { useState } from 'react';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import Link from 'next/link';
function Login() {
  const router = useRouter();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('/auth/login', input, { withCredentials: true })
      .then(async (result) => {
        localStorage.setItem('isAuth', true);
        localStorage.setItem('roles', result.data.result.roles);
        localStorage.setItem('avatar', result.data.result.avatar);
        localStorage.setItem('id', result.data.result.id);
        router.push('/');
      })
      .catch((error) => {
        console.log(error.response);
        swal('error', error?.response?.data?.message || 'Login Gagal nih', 'error');
      });
  };
  return (
    <LayoutAuth>
      <LoginLayout>
        <div className="custom-hero">
          <Image src={heroLogin} layout="fill" objectFit="cover" alt="hero login"></Image>
        </div>
        <div className="auth-wrapper">
          <p className="header text-64 c-white text-bold">Le’ts Explore The World</p>
          <div className="auth-content">
            <div className="left">
              <form onSubmit={handleLogin}>
                <div className="input-auth">
                  <Input
                    type="text"
                    name="email"
                    autocomplete="email"
                    onChange={handleChange}
                    className="text-24 c-white text-bold email"
                    placeholder="Email"
                  ></Input>
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    autocomplete="current-password"
                    className="text-24 c-white text-bold"
                    placeholder="Password"
                  ></Input>
                </div>
                <div className="forgot-password">
                  <Link href="/forgot-password">
                    <a className="c-white">Forgot password?</a>
                  </Link>
                </div>
                <div>
                  <Button type="submit" className="login text-24 text-bold">
                    Login
                  </Button>
                </div>
              </form>
            </div>
            <div className="or">
              <p>or</p>
            </div>
            <div className="right">
              <div className="button-signup">
                <Button iconText Image={google} height="33px" width="34px" className="withGoogle text-24 text-bold">
                  Login with Google
                </Button>
                <Link href="/signup">
                  <a>
                    <Button className="signup text-24 text-bold">Sign up</Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </LoginLayout>
    </LayoutAuth>
  );
}

export default Login;

export const getServerSideProps = publicRoute(async () => {
  return {
    props: {},
  };
});
const LoginLayout = styled.div`
  background: rgba(0, 0, 0, 0.38);
  .custom-hero {
    position: relative;
    width: 100vw;
    z-index: -1;
    min-height: 100vh;
  }
  .header {
    max-width: 390px;
    ${customMedia.lessThan('media_md')`
  max-width: 300px
    `}
    font-family: Playfair Display;
  }
  .auth-wrapper {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;

    padding: 5rem;
    ${customMedia.lessThan('media_md')`
  // position: unset;
  padding: 5rem 1rem;
    `}
    .auth-content {
      margin-top: 5rem;
      display: flex;

      ${customMedia.lessThan('media_md')`
  display: unset;
  `}
      .left {
        flex: 2;
        margin: auto;
        .input-auth {
          input {
            padding: 1rem 2rem;
            background: rgba(218, 218, 218, 0.28);
            border: 0.5px solid rgba(78, 78, 78, 0.5);
            border-radius: 10px;
          }
          .email {
            margin-bottom: 2rem;
          }
        }
        .forgot-password {
          margin-top: 1rem;
        }
        .login {
          margin-top: 2.5rem;
          background: #ffcd61;
          ${customMedia.greaterThan('media_md')`
          width: 50%;`}
          box-shadow: 0px 0px 20px rgba(248, 161, 112, 0.47);
        }
      }
      .or {
        flex: 1;
        text-align: center;
        ${customMedia.greaterThan('media_md')`
          margin-top: 55px;
          `}
        margin: auto;
        font-family: Nunito;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 49px;

        color: #ffffff;
      }
      .right {
        // padding: 5rem;
        flex: 2;

        // justify-content: center;
        // align-items: center;

        .withGoogle {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          background: #ffffff;
          box-shadow: 0px 0px 20px rgba(78, 78, 78, 0.4);
        }
        .signup {
          background: #393939;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
          color: #ffcd61;
        }
      }
    }
  }
  button {
    padding: 1rem;
  }
  input::placeholder {
    color: #fff;
  }
`;
