import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import { brand, home, history, searchGrey, about } from '../../public/asset';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../atoms/Button';

function Navbar() {
  return (
    <>
      <StyleNavbar>
        <Image src={brand} alt="Brand"></Image>
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
          <div className="button">
            <Button className="text-black">Login</Button>
            <Button className="text-black">Register</Button>
          </div>
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
    button:nth-child(1) {
      padding: 8px 46px;
      background: #fff;
      border: 1px solid #ffcd61;
    }
    button:nth-child(2) {
      padding: 8px 36px;
      background: #ffcd61;
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
    }
    .route-custom:hover {
      background: red;
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
  }
  `}
`;
