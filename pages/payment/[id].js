/* eslint-disable @next/next/no-img-element */
import { axios } from '@/configs';
import { Input, Button, Main } from '@/components';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import { privateRoute } from '@/configs';
import { useSelector } from 'react-redux';
function Id(vehicle) {
  const ReserData = useSelector((state) => state.reservation.data);
  const { qty, subTotal, startDate } = ReserData;
  const data = vehicle.result[0];
  const { category, description, stock, location, name, price, status, id, image } = data;

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
            </div>
          </div>
        </StyleDetail>
        <StatusPayment>
          <div className="left lft">
            <div className="lft">
              <div className="left-content">
                <p
                  className="text-24 text-bold"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  Quantity : {qty} bikes
                </p>
              </div>
              <div className="left-content">
                <p className="text-24 text-bold">Order details : </p>
                <p className="text-24 ">Total: {subTotal}</p>
              </div>
            </div>
            <div className="lft">
              <div className="left-content">
                <p className="text-24 text-bold">Reservation Date : {startDate} </p>
              </div>
              <div className="left-content">
                <p className="text-24 text-bold">Identity: </p>
                <p className="text-24 ">Samantha Doe (+6290987682)</p>
                <p className="text-24">samanthadoe@mail.com</p>
              </div>
            </div>
          </div>
        </StatusPayment>
        <Payment className="">
          <label htmlFor="method">Payment:</label>
          <select id="method" className="bg__gray" style={{ width: '100%', padding: '1.35rem', border: 'none' }}>
            <option className="text-24">Cash</option>
            <option className="text-24">Transfer</option>
          </select>
        </Payment>
        <StyleButton className="choice-item">
          <div className="choice-item">
            <Button className="text-24 text-bold  bg__primary">Finish Payment</Button>
          </div>
        </StyleButton>
      </>
    </Main>
  );
}

export default Id;

const Payment = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: row;
  align-items: center;
  gap: 50%;
`;

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
    p {
      padding: 0;
      margin: 0;
    }
    height: 100%;
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
  const res = await axios.get(`/vehicle/${id}`);
  const vehicle = await res.data;
  return {
    props: vehicle,
  };
});
