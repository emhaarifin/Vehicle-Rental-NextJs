import styled from 'styled-components';
import { CardHistory, Search, Main, CardProduct } from '@/components';
import { customMedia } from '../../styles/breakpoint';
import { axios, privateRoute } from '@/configs';
import cookies from 'next-cookies';

function History({ DataHistory, vehicles }) {
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
            {DataHistory ? (
              DataHistory?.map((item, index) => {
                console.log(item.image[0]);
                return (
                  <CardHistory
                    key={index}
                    name={item.VehicleName}
                    image={item.image[0]}
                    status={item.status}
                    date={item.startDate}
                    total={item.subTotal}
                    href={`/payment/${item.id}`}
                    // onClick={}
                  ></CardHistory>
                );
              })
            ) : (
              <p>Belum Ada Reservasi</p>
            )}
          </div>
        </div>
        {/* <div className="right">
          <p>New Arrival</p>
          <div className="right-card">
            {vehicles?.map((item, index) => {
              return (
                <>
                  <CardProduct
                    href={`/vehicle/${item.id}`}
                    key={index}
                    image={item.image[0]}
                    alt={item.name}
                    name={item.name}
                    location={item.location}
                  ></CardProduct>
                </>
              );
            })}
          </div>
        </div> */}
      </StyleHistory>
    </Main>
  );
}

const StyleHistory = styled.div`
  display: flex;
  gap: 5%;
  // & .right {
  //   top: 10px;
  //   height: calc(100vh + 250px);
  //   position: sticky;
  //   .right-card {
  //     width: 100%;
  //   }
  // }
  ${customMedia.lessThan('media_md')`
  flex-direction: column;`}
  & .left {
    flex: 2 16%;
    .search {
      display: flex;
      gap: 5%;
    }
  }
  // & .right {
  //   flex: 1;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   border: 1px solid #dadada;
  //   box-sizing: border-box;
  //   border-radius: 10px;
  //   padding: 1rem;
  // }
`;

export default History;

export const getServerSideProps = privateRoute(async (context) => {
  try {
    const idUser = cookies(context).id;
    const res = await axios.get(`/reservation/get/${idUser}`);
    const DataHistory = await res.data.result;
    const resVehicle = await axios.get(`/vehicle?limit=2&sort=DESC`);
    const vehicles = await resVehicle.data.data;
    return {
      props: { DataHistory, vehicles },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
});
