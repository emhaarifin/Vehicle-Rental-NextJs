/* eslint-disable @next/next/no-img-element */
import { axios } from '@/configs';
import { Main } from '@/components';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import { privateRoute } from '@/configs';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function Id(DataReser) {
  const { userData } = useSelector((state) => state.user);
  const { result } = DataReser;
  const { fullname, phone_number, email } = userData;
  const [payment, setPayment] = useState(result);
  return (
    <Main>
      <p>Detail Item</p>
      {payment &&
        payment?.map((item) => {
          console.log(item);
          return (
            <>
              <StyleDetail>
                <div className="left">
                  <div className="left-img img-item">
                    <div className="img-item">
                      <img className="img-main" src={item.image[0]} alt=""></img>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="right-content">
                    <p className="text 24">Reservation Id: {item.id}</p>
                    <p className="text-48 text-bold font-playfair">{item.VehicleName}</p>
                    <p className="text-36 font-playfair">{item.name_location}</p>
                    <p className="text-24">Type: {item.name_category}</p>
                  </div>
                </div>
              </StyleDetail>
              <StatusPayment>
                <div className="left lft">
                  <div className="lft">
                    <div className="left-content">
                      <p className="text-24 text-bold">Quantity : {item.qty} bikes</p>
                    </div>
                    <div className="left-content">
                      <p className="text-24 text-bold">Order details : </p>
                      <p className="text-24 ">Total: {item.subTotal}</p>
                      <p className="text-24">Status: {item.status}</p>
                      <p className="text-24">Payment method: {item.method}</p>
                    </div>
                  </div>
                  <div className="lft">
                    <div className="left-content">
                      <p className="text-24 text-bold">Reservation Date : </p>
                      <p>{item.startDate}</p>
                    </div>
                    <div className="left-content">
                      <p className="text-24 text-bold">Identity: </p>
                      <p className="text-24 ">
                        {fullname} {phone_number}
                      </p>
                      <p className="text-24">{email || 'aa'}</p>
                    </div>
                  </div>
                </div>
              </StatusPayment>
            </>
          );
        })}
    </Main>
  );
}

export default Id;

const StatusPayment = styled.div`
  margin-top: 3rem;
  ${customMedia.greaterThan('media_md')`
.left {
  gap: 1rem;
  display: flex;
  .lft {
    flex: 1;
    display:flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .left-content {
    flex:1;
    p {
      padding: 0;
      margin: 0;
    }
    padding: 1rem 5rem;
  border-radius: 10px;
  border: 1px solid #80918E;
  }
}
    `}
`;
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

export const getServerSideProps = privateRoute(async (context) => {
  const { id } = context.params;
  const res = await axios.get(`/reservation/${id}`);
  const DataReser = await res.data;

  return {
    props: DataReser,
  };
});
