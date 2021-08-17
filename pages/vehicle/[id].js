import { useRouter } from 'next/router';
import axios from 'axios';
import Main from '../../components/templates/Main';
// import Link from 'next/link';

import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
function Id(vehicle) {
  const data = vehicle.result;
  return (
    <Main>
      <p>Detail Item</p>
      {data.map((item, index) => {
        return (
          <StyleDetail key={index}>
            <div className="left">
              <img src={item.image} alt={item.name}></img>
              <Button className="bg__black text-24 c-primary">Add to home page</Button>
            </div>
            <div className="right">
              <p className="text-48 text-bold font-playfair">{item.name}</p>
              <p className="text-36 font-playfair">{item.location}</p>
              <p className="text-24 c-green text-bold">{item.status}</p>
              <p className="text-24">Type: {item.category}</p>
              <p className="text-36 font-playfair text-bold price">Rp. {item.price}/day</p>
              <div className="choice choiche-item">
                <div className="choice-item">
                  <Button className="btn-minus bg__gray">-</Button>
                  <Input type="number" value="12"></Input>
                  <Button className="btn-plus bg__primary">+</Button>
                </div>
                <div className="choice-item">
                  <Button className="text-24 bg__primary">Edit Item</Button>
                </div>
              </div>
            </div>
          </StyleDetail>
        );
      })}
    </Main>
  );
}

export default Id;

const StyleDetail = styled.div`
  ${customMedia.greaterThan('media_md')`
  display: flex;
  gap: 2rem;
  `}
  .left {
    flex: 1;
    button {
      padding: 1.35rem;
    }
  }
  .right {
    flex: 1;
    .price {
      ${customMedia.greaterThan('media_md')`
      text-align: center;
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
          padding: 1.5rem 2rem;
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

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await axios.get(`http://localhost:4000/vehicle/${id}`);
  const vehicle = await res.data;
  return {
    props: vehicle,
  };
}
