/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { customMedia } from '../../styles/breakpoint';
function CardProduct(props) {
  return (
    <Link href={props.href}>
      <a>
        <StyleCard>
          {/* <div className="product-img"> */}
          <img src={props.image} alt={props.alt}></img>
          {/* </div> */}
          <div className="information info">
            <p className="info">{props.name}</p>
            <p className="info">{props.location}</p>
          </div>
        </StyleCard>
      </a>
    </Link>
  );
}

export default CardProduct;

const StyleCard = styled.div`
  img {
    position: absolute;
    max-width: 100%;
    min-height: inherit;
    border-radius: 10px;
    object-fit: cover;
  }
  width: 261px;
  min-height: 337px;
  position: relative;
  .information {
    background: #fff;
    width: 55%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.7rem 0.7rem 0.2rem 1rem;
    border-radius: 0px 6px 0px 0px;
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
  }
`;
