import styled from 'styled-components';
import { customMedia } from '../styles/breakpoint';
import { google, heroSignup } from '@/asset';
import Image from 'next/image';
import Link from 'next/link';
import { publicRoute, register } from '@/configs';
import { Button, Input, Footer, LayoutAuth } from '@/components';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <LayoutAuth register>
      <RegisterLayout>
        <div className="left">
          <div className="custom-hero">
            <Image src={heroSignup} alt="hero signup" layout="fill" objectFit="cover" id="hero-signup"></Image>
          </div>
        </div>
        <div className="right">
          <Formik
            initialValues={{
              fullname: '',
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              fullname: Yup.string().required('Name is required'),
              email: Yup.string().email('Invalid email address').required('Email is required'),
              password: Yup.string().min(8, 'Password must be at least 8 charaters').required('Password is required'),
            })}
            onSubmit={(values, { resetForm }) => {
              dispatch(register(values, router, resetForm));
            }}
          >
            {({ values, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
              <Form onSubmit={handleSubmit}>
                <div className="right-content">
                  <p className="text-48 header text-bold">Sign Up</p>
                  <div className="input-auth">
                    <Input
                      type="text"
                      id="fullname"
                      name="fullname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullname}
                      className="text-24"
                      placeholder="Name"
                    />
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="text-24"
                      placeholder="Email"
                    />
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className="text-24"
                      placeholder="Password"
                    />
                  </div>
                  <div className="button-auth">
                    <Button
                      type="submit"
                      className="signup text-24 text-bold"
                      disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}
                    >
                      Sign Up
                    </Button>
                    <div className="divider">
                      <hr className="divider-line"></hr>
                      <span className="text-24 span">or try another way</span>
                      <hr className="divider-line"></hr>
                    </div>
                    <Button
                      type="button"
                      iconText
                      Image={google}
                      height="33px"
                      width="34px"
                      className="withGoogle text-24 text-bold"
                    >
                      Sign Up with Google
                    </Button>
                    <Link href="/login">
                      <a>
                        <Button className="login text-24 text-bold">Login</Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <Footer onlyRegister={true} />
        </div>
      </RegisterLayout>
    </LayoutAuth>
  );
}

export default Signup;

export const getServerSideProps = publicRoute(async () => {
  return {
    props: {},
  };
});
const RegisterLayout = styled.div`
  display: flex;

  .left {
    position: relative;
    flex: 1;
    min-height: 100vh;
    width: 100%;
    .custom-hero {
      width: 50vw;
      height: 100%;
    }
    ${customMedia.lessThan('media_md')`
    display: none;
    `}
  }
  .header {
    font-family: Playfair Display;
  }
  .right {
    flex: 1;
    margin-top: 3rem;
    .right-content {
      padding: 1rem 6rem;
      ${customMedia.lessThan('media_xl')`
    padding: 1rem 3rem;
    `}
      ${customMedia.lessThan('media_md')`
    padding: 1rem;
    `}
    }
    .input-auth {
      margin-top: 3rem;
      input {
        margin-bottom: 2rem;
        padding: 1rem 2rem;
        background: rgba(218, 218, 218, 0.28);
        border: 0.5px solid rgba(78, 78, 78, 0.5);
        border-radius: 10px;
      }
    }
    .button-auth {
      .divider {
        display: flex;
        flex-direction: row;
        margin: 2rem 0;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .divider-line {
          flex: 1;
          border: 2px solid black;
        }
        .span {
          // flex: 2 20%;
          text-align: center;
          color: rgba(57, 57, 57, 0.5);
        }
      }
      button {
        padding: 1rem;
      }
      .signup {
        background: #ffcd61;
        box-shadow: 0px 0px 20px rgba(248, 161, 112, 0.47);
      }
      .withGoogle {
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        background: #ffffff;
        box-shadow: 0px 0px 20px rgba(78, 78, 78, 0.4);
      }
      .login {
        background: #393939;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
        color: #ffcd61;
      }
    }
    footer {
      padding: 1rem 3rem;
      margin-top: 2rem;
      ${customMedia.lessThan('media_xl')`
    padding: 2rem;
    `}
      ${customMedia.lessThan('media_md')`
    padding: 1rem;
    `}
    }
  }
`;
