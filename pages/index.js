import Link from 'next/link';
import { Button, Input, Navbar, Footer, CardContainer, CardProduct } from '@/components';
import { axios } from '@/configs';
import styled from 'styled-components';
import { customMedia } from '../styles/breakpoint';
import { useEffect, useState } from 'react';

export default function Home({ vehicles }) {
  const [roles, setRoles] = useState();
  const getRole = () => {
    const roles = localStorage.getItem('roles');
    setRoles(roles);
  };
  useEffect(() => {
    if (localStorage.getItem('roles')) {
      getRole();
    }
  }, []);
  return (
    <>
      <ContainerMain>
        <Navbar></Navbar>
      </ContainerMain>
      <br></br>
      <StyleHero className="hero">
        <ContainerMain>
          <div className="hero-wrapper">
            <div className="hero-content">
              <div>
                <p className="text-64 c-white font-playfair">Explore and Travel</p>
                <p className="text-22 c-white">Vehicle Finder</p>
              </div>
              <div className="my-flex my-col">
                <div className="my-flex my-row">
                  <Input disabled className="cstm" placeholder="Location"></Input>
                  <Input disabled className="cstm" placeholder="Type"></Input>
                </div>
                {/* <div className="my-flex my-row">
                  <Input className="cstm " placeholder="Payment"></Input>
                  <Input className="cstm" placeholder="Date"></Input>
                </div> */}
              </div>
              <Button disabled={true} className="btn-exprole text-bold bg__primary c-black text-18">
                Exprole
              </Button>
            </div>
          </div>
        </ContainerMain>
      </StyleHero>
      <ContainerMain>
        <Popular>
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
                  href={`/vehicle/${item.id}`}
                  key={index}
                  image={item.image[0]}
                  alt={item.name}
                  name={item.name}
                  location={item.location}
                ></CardProduct>
              );
            })}
          </CardContainer>
          {roles === 'admin' && (
            <Link href="/admin/add-vehicle">
              <a>
                <Button className="bg__black add-new-item text-24 c-primary">Add new item</Button>
              </a>
            </Link>
          )}
        </Popular>
      </ContainerMain>
      <ContainerMain>
        <Footer></Footer>
      </ContainerMain>
    </>
  );
}

const StyleHero = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.4) url('asset/images/hero-home.svg');
  background-size: 100%;
  background-blend-mode: multiply;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;

  ${customMedia.lessThan('media_lg')`
  background-size: auto;
  `}
  ${customMedia.lessThan('media_md')`
  
  .hero-content{
    display:flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
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
    padding: 5rem;
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
  .cstm {
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0.5);
    border: 0.8px solid #afb0b9;
  }
  .cstm::placeholder {
    color: #393939;
    mix-blend-mode: normal;
  }
  input,
  button {
    padding: 1rem;
  }
  .add-new-item {
    padding: 1rem;
  }
  margin-bottom: 2.5rem;
`;

const ContainerMain = styled.div`
  // width: 100vw;

  max-width: 1440px;
  // padding: 5rem;
  // padding-top: 1rem;
  margin: 0 auto;
  ${customMedia.lessThan('media_sm')`
  // padding: 1rem;
`}
`;

const Popular = styled.div`
  padding: 5rem;
  padding-top: 1rem;
  margin: 0 auto;
  ${customMedia.lessThan('media_sm')`
  padding: 1rem;
`}
`;

export async function getServerSideProps() {
  const res = await axios.get(`/vehicle?limit=5&sort=DESC`);
  const vehicles = await res.data.data;
  return {
    props: { vehicles },
  };
}
