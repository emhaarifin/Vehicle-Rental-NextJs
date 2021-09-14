import styled from 'styled-components';
import Image from 'next/image';
import { Button, Input, LayoutAuth } from '@/components';
import { axios, publicRoute, login } from '@/configs';
import { heroLogin, google } from '@/asset';
import { customMedia } from '../styles/breakpoint';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <LayoutAuth>
      <LoginLayout>
        <div className="custom-hero">
          <div className="hero-wrapper">
            <Image src={heroLogin} layout="fill" objectFit="cover" alt="hero login"></Image>
          </div>
        </div>
        <div className="auth-wrapper">
          <p className="header text-64 c-white text-bold">Le’ts Explore The World</p>
          <div className="auth-content">
            <div className="left">
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values, { resetForm }) => {
                  dispatch(login(values, router, resetForm));
                }}
                validationSchema={Yup.object({
                  email: Yup.string().email('Email is Invalid').required('email is required'),
                  password: Yup.string().required('Password is required'),
                })}
              >
                {({ values, touched, handleBlur, handleChange, handleSubmit, isValid }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="input-auth">
                      <div className="email">
                        <Input
                          type="text"
                          name="email"
                          autocomplete="email"
                          id="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          className="text-24 c-white text-bold "
                          placeholder="Email"
                        ></Input>
                      </div>
                      <div>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          autocomplete="current-password"
                          className="text-24 c-white text-bold"
                          placeholder="Password"
                        ></Input>
                      </div>
                    </div>
                    <div className="forgot-password">
                      <Link href="/forgot-password">
                        <a className="c-white">Forgot password?</a>
                      </Link>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}
                        className="login text-24 text-bold"
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
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
  position: relative;
  background: rgba(0, 0, 0, 0.38);
  .custom-hero {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    z-index: -4;
    .hero-wrapper {
      position: relative;
      height: 100%;
      img {
        object-fit: cover;
      }
    }
  }
  .header {
    max-width: 390px;
    ${customMedia.lessThan('media_md')`
      max-width: 300px
    `}
    font-family: Playfair Display;
  }
  .auth-wrapper {
    padding: 5rem;
    ${customMedia.lessThan('media_md')`
      padding: 5rem 1rem;
    `}
    .auth-content {
      margin-top: 2rem;
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
        flex: 2;
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
