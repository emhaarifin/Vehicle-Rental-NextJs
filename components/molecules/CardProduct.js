/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { customMedia } from '../../styles/breakpoint';
function CardProduct(props) {
  return (
    <StyleCard>
      <Link href={props.href}>
        <a>
          <div className="product-img">
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/${props.image}`} alt={props.alt}></img>
          </div>
          <div className="information info">
            <p className="info">{props.name}</p>
            <p className="info">{props.location}</p>
          </div>
        </a>
      </Link>
    </StyleCard>
  );
}

export default CardProduct;

const StyleCard = styled.div`
  flex: 1 46%;
  ${customMedia.greaterThan('media_md')`
flex: 1 21%;
`}
  ${customMedia.greaterThan('media_xl')`
flex: 1 16%;
`}
  position: relative;
  a {
    width: 100%;
    height: 100%;
  }
  max-width: 261px;
  min-height: 337px;
  margin-bottom: 2rem;
  .product-img {
    position: absolute;
    border-radius: 10px;
    img {
      max-width: 100%;
      min-height: 337px;
      max-height: 337px;
      border-radius: 10px;
      object-fit: cover;
    }
  }
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
