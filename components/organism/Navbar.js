/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/link-passhref */
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import { brand, history, searchGrey, home, about, avatarUser, email, arrowRightBlack } from '../../public/asset';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../atoms/Button';
import { useState, useEffect } from 'react';
import cookieCutter from 'cookie-cutter';
import axios from 'axios';
function Navbar({ DataUser }) {
  const [login, setLogin] = useState(true);
  const [avatar, setAvatar] = useState(avatarUser.src);
  const [refresh, setRefresh] = useState(true);
  function dropDownUser() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  const handleLogOut = () => {
    localStorage.clear();
    setLogin(!login);
  };

  const isAuth = async () => {
    let id = localStorage.getItem('id');
    const res = await axios.get(`http://localhost:4000/auth/profile/${id}`);
    const DataUser = await res.data.result;

    const auth = localStorage.getItem('isAuth');
    const avaP = localStorage.getItem('avatar');
    setLogin(auth);
    if (avatar === null || avatar === 'null') {
      return setAvatar(avatarUser.src);
    } else {
      return setAvatar(DataUser[0]?.avatar);
    }
  };

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
            <Image src={brand} alt="Brand"></Image>
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
                src={avatar}
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
                <Link href="/">
                  <div className="dropdown-item">
                    <a onClick={handleLogOut} className="text-14 text-bold">
                      Logout
                    </a>
                    <Image src={arrowRightBlack} width="10px" height="14px" alt="go"></Image>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="button">
              <div>
                <Link href="/login">
                  <Button className="text-black login">Login</Button>
                </Link>
              </div>
              <div>
                <Link href="/signup">
                  <Button className="text-black signup">Sign Up</Button>
                </Link>
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
