/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import axios from 'axios';
import Main from '../../components/templates/Main';
import Link from 'next/link';
import Image from 'next/image';
import { arrowLeftBlack, arrowRightBlack } from '../../public/asset';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import { useState, UseEffect } from 'react';
import { useDispatch } from 'react-redux';
import cookies from 'next-cookies';
import { addReservation } from '../../redux/actions/reservation';
import { requireAuthentication } from '../../components/HOC/requireAuth';
function Id(vehicle) {
  const { idUser } = vehicle;
  const data = vehicle.vehicle[0];
  const { category, description, stock, location, name, price, status, id, image } = data;
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    userId: idUser,
    vehicleId: id,
    qty: 1,
    subTotal: price,
  });
  const handleQty = (params) => {
    if (params === 'plus' && form.qty < stock) {
      setForm({
        ...form,
        qty: form.qty + 1,
        subTotal: price * form.qty,
      });
    }
    if (params === 'minus' && form.qty > 1) {
      setForm({
        ...form,
        qty: form.qty - 1,

        subTotal: price * form.qty,
      });
    }
  };
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
            </div>
          </div>
          <div className="right">
            <div className="right-content">
              <p className="text-48 text-bold font-playfair">{name}</p>
              <p className="text-36 font-playfair">{location}</p>
              <p className="text-24">Type: {category}</p>
              <div className="choice choiche-item">
                <div className="choice-item">
                  <Button onClick={() => handleQty('minus')} className="btn-minus bg__gray">
                    -
                  </Button>
                  <Input type="number" value={form.qty}></Input>
                  <Button onClick={() => handleQty('plus')} className="btn-plus bg__primary">
                    +
                  </Button>
                </div>
              </div>
              <div className="mt-5 ">
                <p className="text-24 text-bold">Reservation Date :</p>
                <select className="bg__gray" style={{ width: '100%', padding: '1.35rem', border: 'none' }}>
                  <option className="text-24">1 Day</option>
                </select>
              </div>
            </div>
          </div>
        </StyleDetail>
        <StyleButton className="choice-item">
          <div className="choice-item">
            <Link href={`/payment/${id}`}>
              <a>
                <Button onClick={() => dispatch(addReservation(form))} className="text-24 text-bold  bg__primary">
                  Pay Now : Rp. {form.subTotal}
                </Button>
              </a>
            </Link>
          </div>
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
  margin-top: 5rem;
  .choice-item:nth-child(1) {
    box-shadow: 0px 0px 20px rgba(251, 143, 29, 0.4);
  }
  button {
    padding: 1.35rem;
  }
`;

// export async function getServerSideProps(context) {
//   const idUser = cookies(context).id;
//   const { id } = context.params;
//   const res = await axios.get(`http://localhost:4000/vehicle/${id}`);
//   const vehicle = await res.data.result;
//   return {
//     props: { vehicle, idUser },
//   };
// }

export const getServerSideProps = requireAuthentication(async (context) => {
  const idUser = cookies(context).id;
  const { id } = context.params;
  const res = await axios.get(`http://localhost:4000/vehicle/${id}`);
  const vehicle = await res.data.result;
  return {
    props: { vehicle, idUser },
  };
});
