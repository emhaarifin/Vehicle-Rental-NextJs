/* eslint-disable react-hooks/exhaustive-deps */
import { CardProduct, CardContainer, Button, Search, Main } from '@/components';
import { axios } from '@/configs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
function VehicleType({ resData }) {
  const router = useRouter();
  const { query } = useRouter();
  let [data, setData] = useState([]);
  let pageNumbers = [];
  let [pagination, setPagination] = useState('');
  const [Number, setNumber] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState('sortBy=id&sort=ASC');
  const [Refresh, setRefresh] = useState(false);
  const [err, setErr] = useState();
  const type = query.type;

  useEffect(async () => {
    // setData(resData);
    getData();
  }, [Refresh]);

  const getData = async () => {
    await axios
      .get(`/vehicle?limit=5&table=category&page=${Number}&search=${type}&${sort}&${searchKeyword}`)
      .then((result) => {
        const data = result.data.data;
        const pageDetail = result.data.pageDetail;
        setData(data);
        setPagination(pageDetail);
        setErr(result.data.status);
      })
      .catch((err) => setErr(err.response.status));
  };

  for (let i = 1; i <= pagination.totalPage; i++) {
    pageNumbers.push(i);
  }

  const btnPagination = (Number) => {
    setNumber(Number);
    Refresh === true ? setRefresh(false) : setRefresh(true);
  };
  const handleSearch = (e) => {
    setSearchKeyword(`&searchVehicle=${e.target.value}`);
    Refresh === true ? setRefresh(false) : setRefresh(true);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
    Refresh === true ? setRefresh(false) : setRefresh(true);
  };
  if (router.isFallback) {
    return <h1>halaman loading</h1>;
  }
  return (
    <Main>
      <>
        <Search onChange={(e) => handleSearch(e)} placeholder="Search vehicle"></Search>
        {err === 404 ? (
          <p>Data Tidak Ada</p>
        ) : (
          <StyleType>
            <br></br>
            <select className="bg__gray" onChange={(e) => handleSort(e)} style={{ padding: '1rem', border: 'none' }}>
              <option selected disabled hidden>
                Urutkan berdasar
              </option>
              <option value="sortBy=price&sort=desc">Barang Mewah</option>
              <option value="sortBy=price&sort=asc">Sewa Termurah</option>
            </select>
            <br></br>
            <br></br>
            <div className="d-flex justify-content-between">
              <p className="text-36 font-playfair">{query.type}</p>
            </div>
            <CardContainer>
              {data?.map((item, index) => {
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
            <section className="container pagination-wrapper">
              <nav>
                <ul className="pagination">
                  {pageNumbers.map((number) => {
                    return (
                      <li key={number} className="page-item">
                        <Button onClick={() => btnPagination(number)} className="c-primary page-link">
                          {number}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </section>
          </StyleType>
        )}
      </>
    </Main>
  );
}

export default VehicleType;
const StyleType = styled.div`
  .pagination-wrapper {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    nav {
      ul {
        display: flex;
        list-style-type: none;
        gap: 2rem;
      }
    }
  }
`;

export const getStaticPaths = async () => {
  const { data } = await axios.get(`/category`);

  const dataLocation = data.result.map((item) => ({
    params: { type: item.name_category.toLowerCase() },
  }));
  // ket: data paths harus sperti dibawah
  const paths = [{ params: { type: 'bike' } }];
  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const type = context.params.type;
  const { data } = await axios.get(`/vehicle?limit=5&table=category&search=${type}`);

  return {
    props: {
      resData: data.data,
    },
  };
};
