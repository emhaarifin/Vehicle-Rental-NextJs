import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import CardProduct from '../components/molecules/CardProduct';
import Main from '../components/templates/Main';
import axios from 'axios';
import styled from 'styled-components';
import { customMedia } from '../styles/breakpoint';
import CardContainer from '../components/molecules/CardContainer';
import { heroSignup } from '../public/asset';
export default function Home({ vehicles }) {
  return (
    <Main>
      <CardContainer>
        {vehicles?.map((item, index) => {
          return (
            <CardProduct
              href={`/admin/vehicle/${item.id}`}
              key={index}
              image={item.image}
              alt={item.name}
              name={item.name}
              location={item.location}
            ></CardProduct>
          );
        })}
      </CardContainer>
    </Main>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`http://localhost:4000/vehicle?limit=4`);
  const vehicles = await res.data.data;
  return {
    props: { vehicles },
  };
}
