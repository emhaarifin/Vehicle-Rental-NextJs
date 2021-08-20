/* eslint-disable react-hooks/exhaustive-deps */
import CardContainer from '../../components/molecules/CardContainer';
import CardProduct from '../../components/molecules/CardProduct';
import Main from '../../components/templates/Main';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../../components/atoms/Button';

import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import Search from '../../components/molecules/Search';
function VehicleType() {
  const { query } = useRouter();
  const [data, setData] = useState([]);

  let pageNumbers = [];
  const [pagination, setPagination] = useState('');
  const [Number, setNumber] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState('sortBy=id&sort=ASC');
  const [Refresh, setRefresh] = useState(false);
  const [err, setErr] = useState();
  const type = query.type;
  useEffect(async () => {
    await axios
      .get(
        `http://localhost:4000/vehicle?limit=4&table=category&page=${Number}&search=${type}&${sort}&${searchKeyword}`
      )
      .then((result) => {
        const data = result.data.data;
        const pageDetail = result.data.pageDetail;
        setData(data);
        setPagination(pageDetail);
        setErr(result.data.status);
      })
      .catch((err) => setErr(err.response.status));
  }, [Refresh]);

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
  return (
    <Main>
      <>
        <Search onChange={(e) => handleSearch(e)} placeholder="Search vehicle"></Search>
        {err === 404 ? (
          <p>Data Tidak Ada</p>
        ) : (
          <StyleType>
            <br></br>
            <select onChange={(e) => handleSort(e)}>
              <option selected disabled hidden>
                Urutkan berdasar
              </option>
              <option value="sortBy=price&sort=desc">Barang Mewah</option>
              <option value="sortBy=price&sort=asc">Sewa Termurah</option>
            </select>
            <div className="d-flex justify-content-between">
              <p className="text-36 font-playfair">{query.type}</p>
            </div>
            <CardContainer>
              {data?.map((item, index) => {
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
