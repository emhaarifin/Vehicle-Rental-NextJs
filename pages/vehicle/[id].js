/* eslint-disable @next/next/no-img-element */
import { axios } from '@/configs';
import Link from 'next/link';
import Image from 'next/image';
import { Main, Button, Input } from '@/components';
import { arrowLeftBlack, arrowRightBlack } from '@/asset';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import { useState, useEffect } from 'react';
function Id(vehicle) {
  const data = vehicle.result[0];
  const { category, description, stock, location, name, price, status, id, image } = data;
  // const image = data.image
  const [roles, setRoles] = useState();
  const getRole = () => {
    const roles = localStorage.getItem('roles');
    setRoles(roles);
  };
  useEffect(() => {
    getRole();
  }, []);
  return (
    <Main>
      <p>Detail Item</p>
      <>
        <StyleDetail>
          <div className="left">
            <div className="left-img img-item">
              <div className="img-item">
                <img className="img-main" src={image[0]} alt=""></img>
              </div>
              <div className="img-item">
                <div className="arrow">
                  <Image src={arrowLeftBlack} alt="arrow"></Image>
                </div>
                <div className="img2">
                  <img className="img-second" src={image[1] ? image[1] : image[0]} alt=""></img>
                </div>
                <div className="img2">
                  <img className="img-second" src={image[2] ? image[2] : image[0]} alt=""></img>
                </div>
                <div className="arrow">
                  <Image src={arrowRightBlack} alt="arrow"></Image>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right-content">
              <p className="text-48 text-bold font-playfair">{name}</p>
              <p className="text-36 font-playfair">{location}</p>
              <p className="text-24 c-green text-bold">{status}</p>
              <p className="text-24">Type: {category}</p>
              <p className="text-36 font-playfair text-bold price">Rp. {price}/day</p>
              <div className="choice choiche-item">
                <div className="choice-item">
                  <Button className="btn-minus bg__gray">-</Button>
                  <Input type="number" value={stock}></Input>
                  <Button className="btn-plus bg__primary">+</Button>
                </div>
              </div>
            </div>
          </div>
        </StyleDetail>
        <StyleButton className="choice-item">
          {roles === 'admin' ? (
            <>
              <div className="choice-item">
                <Button className="bg__black text-24 c-primary">Add to home page</Button>
              </div>
              <div className="choice-item">
                <Link href={`/admin/edit-vehicle/${id}`}>
                  <a>
                    <Button className="text-24  bg__primary">Edit Item</Button>
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="choice-item">
                <Button className="bg__black text-24 c-primary">Chat Admin</Button>
              </div>
              <div className="choice-item">
                <Link href={`/reservation/${id}`}>
                  <a>
                    <Button className="text-24  bg__primary">Reservation</Button>
                  </a>
                </Link>
              </div>
              <div className="choice-item">
                <Button className="bg__black text-24 c-primary">Like</Button>
              </div>
            </>
          )}
        </StyleButton>
      </>
    </Main>
  );
}

export default Id;

const StyleDetail = styled.div`
  ${customMedia.greaterThan('960px')`
  display: flex;
  gap: 2rem;
  `}
  .left {
    gap: 2rem;

    .left-img {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      .img-item:nth-child(1) {
        flex: auto;
        // ${customMedia.greaterThan('768px')`
        // // max-height: 409px;
        // `}
        & .img-main {
          max-height: 409px;
          height: 100%;
          object-fit: cover;
          width: 100%;
          border-radius: 10px;
        }
      }
      .img-item:nth-child(2) {
        display: flex;
        .arrow {
          margin: auto 0;
        }
        ${customMedia.lessThan('media_md')`
        .arrow {
          display: none !important;
        }
        `}
        justify-content: space-between;
        .img2 {
          flex: 1;
          max-height: 158px;
        }
        .img-second {
          width: 100%;
          height: 100%;
          // height: 158px;
          // flex: 1;
          object-fit: cover;
          border-radius: 10px;
        }
        gap: 1rem;
      }
    }
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    button {
      padding: 1.35rem;
    }
  }
  .right {
    flex: 1;
    .right-content {
      width: 100%;
    }
    .price {
      ${customMedia.greaterThan('media_md')`
      text-align: right;
      `}
    }
    .choice {
      display: flex;
      flex-direction: column;
      margin-top: 5rem;
      gap: 2.5rem;
      .choice-item:nth-child(1) {
        display: flex;
        justify-content: space-between;
        button {
          padding: 1.4rem;
          width: 15%;
        }
        input {
          width: 20%;
          text-align: center;
          background: transparent;
        }
      }
      .choice-item:nth-child(2) {
        button {
          padding: 1.35rem;
          box-shadow: 0px 0px 20px rgba(251, 143, 29, 0.4);
        }
        width: 100%;
        align-self: center;
      }
    }
  }
`;

const StyleButton = styled.div`
  ${customMedia.greaterThan('media_md')`
display: flex;
gap: 2.5rem;
`}
  ${customMedia.lessThan('media_md')`
display: flex;
flex-direction: column;
gap: 1.5rem;
`}
  margin-top: 5rem;
  .choice-item:nth-child(1) {
    flex: 1 20%;
  }
  .choice-item:nth-child(2) {
    flex: 2;
    box-shadow: 0px 0px 20px rgba(251, 143, 29, 0.4);
  }
  button {
    padding: 1.35rem;
  }
`;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await axios.get(`/vehicle/${id}`);
  const vehicle = await res.data;
  return {
    props: vehicle,
  };
}
