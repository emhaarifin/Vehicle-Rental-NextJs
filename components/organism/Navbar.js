/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/link-passhref */
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import { brand, history, searchGrey, home, about, avatarUser, email, arrowRightBlack } from '@/asset';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../atoms/Button';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
function Navbar({ avatar }) {
  const [login, setLogin] = useState(true);
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);
  const deleteCookies = (cname) => {
    for (let index = 0; index < cname.length; index++) {
      document.cookie = `${cname[index]}=; 'expires=Thu, 01 Jan 1970 00:00:00 GMT'; path=/;`;
    }
  };
  const handleLogOut = async () => {
    localStorage.clear();
    deleteCookies(['token', 'roles', 'id', 'avatar']);
    await router.push('/login');
    setLogin(!login);
  };

  const isAuth = async () => {
    const auth = await localStorage.getItem('isAuth');
    setLogin(auth);
  };

  function dropDownUser() {
    document.getElementById('myDropdown').classList.toggle('show');
  }
  useEffect(() => {
    isAuth();
    window.onclick = function (event) {
      if (!event.target.matches('.avatar-user')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };
  }, [login]);

  return (
    <>
      <StyleNavbar>
        <Link href="/">
          <a>
            <Image src={brand} className="brand-icon" alt="Brand"></Image>
          </a>
        </Link>
        <div>
          <div className="route">
            <Link href="/">
              <div className="route-custom">
                <>
                  <div className="custom-img">
                    <Image src={home} alt="Search"></Image>
                  </div>
                  <a>Home</a>
                </>
              </div>
            </Link>
            <Link href="/vehicle-type">
              <div className="route-custom">
                <>
                  <div className="custom-img">
                    <Image src={searchGrey} alt="Search"></Image>
                  </div>
                  <a>Vehicle Type</a>
                </>
              </div>
            </Link>
            <Link href="/history">
              <div className="route-custom">
                <>
                  <div className="custom-img">
                    <Image src={history} alt="History"></Image>
                  </div>
                  <a>History</a>
                </>
              </div>
            </Link>
            <Link href="/about">
              <div className="route-custom">
                <>
                  <div className="custom-img">
                    <Image src={about} alt="About"></Image>
                  </div>
                  <a>About</a>
                </>
              </div>
            </Link>
          </div>
          {login ? (
            <div className="icon-user">
              <Image src={email} alt="icon chat"></Image>
              <img
                src={avatar ? avatar : userData[0]?.avatar ? userData[0]?.avatar : avatarUser.src}
                onClick={dropDownUser}
                className="avatar-user"
                width="50px"
                height="50px"
                alt="avatar user"
              ></img>
              <div id="myDropdown" className="dropdown-content">
                <Link href="/profile">
                  <div className="dropdown-item">
                    <a className="text-14 text-bold">Edit Profile</a>
                    <Image src={arrowRightBlack} width="10px" height="14px" alt="go"></Image>
                  </div>
                </Link>
                <Link href="/">
                  <div className="dropdown-item">
                    <a className="text-14 text-bold">Help</a>
                    <Image src={arrowRightBlack} width="10px" height="14px" alt="go"></Image>
                  </div>
                </Link>
                <div className="dropdown-item" onClick={handleLogOut}>
                  <span className="text-14 text-bold">Logout</span>
                  <Image src={arrowRightBlack} width="10px" height="14px" alt="go"></Image>
                </div>
              </div>
            </div>
          ) : (
            <div className="button">
              <div>
                <Button className="text-black login">
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </Button>
              </div>
              <div>
                <Button className="text-black signup">
                  <Link href="/signup">
                    <a>Sign Up</a>
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </StyleNavbar>
    </>
  );
}

export default Navbar;
const StyleNavbar = styled.nav`
  padding: 5rem;
  padding-bottom: 1rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
  }
  .brand-icon {
    cursor:pointer;
  }
  .custom-img {
    display: none;
  }

  .button {
    .login {
      padding: 8px 46px;
      background: #fff;
      border: 1px solid #ffcd61;
      ${customMedia.lessThan('media_lg')`
      padding: 1px 23px;`}
    }
    .signup {
      padding: 8px 36px;
      background: #ffcd61;
      ${customMedia.lessThan('media_lg')`
      padding: 1px 18px;`}
    }
  }
  .icon-user {
    gap: 2rem;
    position: relative;
    .avatar-user {
      object-fit: cover;
      border-radius: 50%;
      cursor: pointer;
    }
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #fff;
      min-width: 160px;
      overflow: auto;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.23);
      border-radius: 10px;
      right: 0;
      top: 3.5rem;
      z-index: 1;
      &.show {
        display: flex;
        flex-direction: column;
        .dropdown-item {
          cursor:pointer;
          padding: 0.75rem 1rem;
          justify-content: space-between;
          &:active {
            background: #ffcd61 !important;
          }
        }
      }
    }
  }
  .route {
    width: 350px;
    margin: auto;
    margin-right: 2.5rem;
    display: flex;
    justify-content: space-between;
    .route-custom {
      color: #b8becd;
      cursor: pointer;
      &:hover, &:focus, &:active {
        color: #ffcd61;
      }
      }
    }
  }

  .button {
    display: flex;
    button {
      margin-left: 1rem;
    }
  }

  hr {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    ${customMedia.lessThan('media_md')`
  flex-direction: column;
  `}
    .identity {
      max-width: 391px;
      .indentity-text {
        margin-top: 1rem;
      }
    }
  }

  ${customMedia.lessThan('media_md')`
  .custom-img {
    display: block;
  }
  .route {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 0 1rem;
    width: 100vw;
    background-color: #f8f9fa;
    opacity: 1;
    z-index: 999;
    margin: auto;
    .route-custom {
      padding: 1rem;
      .custom-img {
        margin: auto;
      }
      a {margin: 0 auto;}
      display: flex;
      flex-direction: column;
    }
  }`}

  ${customMedia.lessThan('media_sm')`
  padding: 1rem;
  .route {
      padding: 0rem;
      .route-custom {
        padding: 0.5rem;
      }
  }`}
`;
