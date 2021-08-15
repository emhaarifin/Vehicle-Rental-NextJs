import Image from 'next/image';
import { heroSignup } from '../../public/asset';
import styled from 'styled-components';

import { customMedia } from '../../styles/breakpoint';
function CardProduct() {
  return (
    <StyleCard>
      <div className="product-img">
        <Image src={heroSignup} layout="fill" objectFit="cover" alt="img product"></Image>
      </div>
      <div className="information info">
        <p className="info">Teluk Bogam</p>
        <p className="info">Kalimantan Utaraaaaa</p>
      </div>
    </StyleCard>
  );
}

export default CardProduct;

const StyleCard = styled.div`
  width: 261px;
  height: 337px;
  display: flex;
  img {
    border-radius: 8px;
  }
  position: relative;
  .information {
    background: #fff;
    width: 55%;
    position: absolute;
    bottom: 0;
    // left: 25%;
    padding: 0.7rem 0.7rem 0.2rem 1rem;
    border-radius: 0px 6px 0px 0px;
    // border-radius: 6px 6px 0px 0px;

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info:nth-child(1) {
      font-family: Nunito;
      font-style: normal;
      font-weight: 600;
      font-size: 17px;
      line-height: 25px;
      margin: 0;
      color: #042521;
    }
    .info:nth-child(2) {
      font-family: Nunito;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      margin: 0;
      line-height: 24px;
      color: #80918e;
    }
    // align-self: flex-start;
  }
`;
