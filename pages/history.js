import Main from '../components/templates/Main';
import Search from '../components/molecules/Search';
import styled from 'styled-components';
import { customMedia } from '../styles/breakpoint';
import CardHistory from '../components/molecules/CardHistory';

import CardProduct from '../components/molecules/CardProduct';
function History() {
  return (
    <Main>
      <StyleHistory>
        <div className="left">
          <div className="search">
            <Search></Search>
            <select onChange={(e) => handleSort(e)}>
              <option selected disabled hidden>
                Urutkan berdasar
              </option>
              <option value="sortBy=price&sort=desc">Barang Mewah</option>
              <option value="sortBy=price&sort=asc">Sewa Termurah</option>
            </select>
          </div>
          <div className="mt-5">
            <CardHistory></CardHistory>
            <CardHistory></CardHistory>
            <CardHistory></CardHistory>
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
