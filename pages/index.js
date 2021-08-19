import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import CardProduct from '../components/molecules/CardProduct';
import Main from '../components/templates/Main';
import axios from 'axios';
import styled from 'styled-components';
import { customMedia } from '../styles/breakpoint';
import CardContainer from '../components/molecules/CardContainer';
import { heroSignup, heroHome } from '../public/asset';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
export default function Home({ vehicles }) {
  return (
    <Main>
      <StyleHero className="hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            <div>
              <p className="text-64 c-white font-playfair">Explore and Travel</p>
              <p className="text-22 c-white">Vehicle Finder</p>
            </div>
            <div className="my-flex my-col">
              <div className="my-flex my-row">
                <Input placeholder="Location"></Input>
                <Input placeholder="Type"></Input>
              </div>
              <div className="my-flex my-row">
                <Input placeholder="Payment"></Input>
                <Input placeholder="Date"></Input>
              </div>
            </div>
            <Button className="btn-exprole text-bold bg__primary c-black text-18">Exprole</Button>
          </div>
        </div>
      </StyleHero>
      <div className="d-flex justify-content-between">
        <p className="text-36 font-playfair">Popular in town</p>
        <Link href="/vehicle-type">
          <a className="text-16 c-primary">View all</a>
        </Link>
      </div>
      <CardContainer>
        {vehicles?.map((item, index) => {
          return (
            <CardProduct
              href={`/admin/vehicle/${item.id}`}
              key={index}
              image={item.image[0]}
              alt={item.name}
              name={item.name}
              location={item.location}
            ></CardProduct>
          );
        })}
      </CardContainer>
      <Link href="/admin/add-vehicle">
        <a>
          <Button className="bg__black text-24 c-primary">Add new item</Button>
        </a>
      </Link>
    </Main>
  );
}

const StyleHero = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.4) url('/public/assets/images/hero-home.svg');
  background-size: 100% auto;
  background-blend-mode: multiply;
  ${customMedia.lessThan('media_md')`
  .hero-content{
    display:flex;
    flex-direction: column;
    gap: 1rem;
  }
    .my-flex {
    display:flex;
    flex-direction: column;
    gap: 1rem;
  }
}
`}
  ${customMedia.greaterThan('media_md')`
  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .my-flex {
    display: flex;
    gap: 1rem;
    &.my-col {
      display: flex;
      gap: 1rem;
      flex-direction: column;
    }
    .my-row {
      width: 45%;
    }
  }
  .btn-exprole {
    width: 15%;
  }
  `}
  input, button {
    padding: 1rem;
  }
  margin-bottom: 2.5rem;
`;

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_BACKEND_API}/vehicle?limit=4&sort=DESC`);
  const vehicles = await res.data.data;
  return {
    props: { vehicles },
  };
}
