import Main from '../components/templates/Main';
import Search from '../components/molecules/Search';
import styled from 'styled-components';
import { customMedia } from '../styles/breakpoint';
import CardHistory from '../components/molecules/CardHistory';
import { requireAuthentication } from '../components/HOC/requireAuth';
import axios from 'axios';
import cookies from 'next-cookies';
import CardProduct from '../components/molecules/CardProduct';
function History(DataHistory) {
  console.log(DataHistory, 'data');
  return (
    <Main>
      <StyleHistory>
        <div className="left">
          <div className="search">
            <Search></Search>
            <select>
              <option selected disabled hidden>
                Urutkan berdasar
              </option>
              <option value="sortBy=price&sort=desc">Barang Mewah</option>
              <option value="sortBy=price&sort=asc">Sewa Termurah</option>
            </select>
          </div>
          <div className="mt-5">
            {DataHistory &&
              DataHistory.DataHistory.map((item, index) => {
                console.log(item);
                return (
                  <CardHistory
                    key={index}
                    name={item.VehicleName}
                    image={item.image[0]}
                    status={item.status}
                    date={item.startDate}
                    total={item.subTotal}
                  ></CardHistory>
                );
              })}
            {/* <CardHistory></CardHistory>
            <CardHistory></CardHistory> */}
          </div>
        </div>
        <div className="right">
          {/* <div> */}
          <p>New Arrival</p>
          {/* <CardProduct></CardProduct>
            <CardProduct></CardProduct> */}
          {/* </div> */}
        </div>
      </StyleHistory>
    </Main>
  );
}

const StyleHistory = styled.div`
  display: flex;
  gap: 5%;
  ${customMedia.lessThan('media_md')`
  flex-direction: column;`}
  .left {
    flex: 2 16%;
    .search {
      display: flex;
      gap: 5%;
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dadada;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 1rem;
  }
`;

export default History;

export const getServerSideProps = requireAuthentication(async (context) => {
  const idUser = cookies(context).id;
  const res = await axios.get(`http://localhost:4000/reservation/get/${idUser}`);
  const DataHistory = await res.data.result;
  return {
    props: { DataHistory },
  };
});
