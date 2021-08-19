import CardContainer from '../components/molecules/CardContainer';
import CardProduct from '../components/molecules/CardProduct';
import Main from '../components/templates/Main';
import { facebook } from '../public/asset';
import axios from 'axios';
import Link from 'next/link';
function VehicleType({ cars, bike, motorbike }) {
  console.log(cars);
  return (
    <Main>
      <br></br>
      <div className="d-flex justify-content-between">
        <p className="text-36 font-playfair">Cars</p>
        <Link href="/view-all/cars">
          <a className="text-16 c-primary">View all</a>
        </Link>
      </div>
      <CardContainer>
        {cars?.map((item, index) => {
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
      <br></br>
      <div className="d-flex justify-content-between">
        <p className="text-36 font-playfair">Bike</p>
        <Link href="/view-all/bike">
          <a className="text-16 c-primary">View all</a>
        </Link>
      </div>
      <CardContainer>
        {bike?.map((item, index) => {
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
      <br></br>
      <div className="d-flex justify-content-between">
        <p className="text-36 font-playfair">Motorbike</p>
        <Link href="/view-all/motorbike">
          <a className="text-16 c-primary">View all</a>
        </Link>
      </div>
      <CardContainer>
        {motorbike?.map((item, index) => {
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
    </Main>
  );
}

export default VehicleType;

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_BACKEND_API}/vehicle?limit=4&sort=DESC&table=category&search=cars`);
  const res1 = await axios.get(`${process.env.NEXT_BACKEND_API}/vehicle?limit=4&table=category&search=bike`);
  const res2 = await axios.get(`${process.env.NEXT_BACKEND_API}/vehicle?limit=4&table=category&search=motorbike`);
  const cars = await res.data.data;
  const bike = await res1.data.data;
  const motorbike = await res2.data.data;
  return {
    props: { cars, bike, motorbike },
  };
}
