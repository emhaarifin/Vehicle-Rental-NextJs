/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { heroLogin } from '@/asset';
import { customMedia } from '../../styles/breakpoint';
import { Button } from '@/components';

function CardHistory(props) {
  return (
    <StyleCard>
      <div className="left-card">
        <div className="the-img">
          <img src={`${process.env.NEXT_PUBLIC_API_URL}/${props.image}`} alt="img"></img>
        </div>
        <div className="information">
          <div>
            <p className="text-24 text-bold c-black">{props.name}</p>
            <p className="text-24 c-black">{props.date}</p>
          </div>
          <div className="mt-1">
            <p className="text-24 p2 text-bold c-black">Prepayment: Rp.{props.total}</p>
            <p className="text-24 p">{props.status}</p>
          </div>
        </div>
      </div>
      <div className="right-card">
        <Button className="text-24 text-bold">Delete</Button>
      </div>
    </StyleCard>
  );
}

const StyleCard = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  overflow: hidden;
  ${customMedia.lessThan('media_md')`
  flex-direction: column;`}
  .left-card {
    transition: 1s;
    overflow: hidden;
    display: flex;
    gap: 1rem;
    ${customMedia.lessThan('media_md')`
    flex-direction: column;
    gap: 0.5rem;
    `}
    .the-img {
      width: 197px;
      min-height: 165px;
      img {
        max-width: 100%;
        min-height: 165px;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    .information {
      margin: auto 0;
      .p2 {
        width: 100%;
      }
      p {
        margin: 0;
        padding: 0;
      }
      .p {
        color: #087e0d;
      }
    }
  }
  &:hover {
    overflow: hidden;
    .left-card {
      margin-left: -100px;
    }
    .right-card {
      visibility: visible;
      opacity: 1;
    }
  }
  .right-card {
    visibility: hidden;
    opacity: 0;
    margin: auto 0;
    button {
      padding: 1rem 2rem;
      background: #ffcd61;
      box-shadow: 0px 0px 20px rgba(251, 143, 29, 0.4);
      border-radius: 10px;
    }
    transition: visibility 10s, opacity 0.8s linear;
  }
`;

export default CardHistory;
