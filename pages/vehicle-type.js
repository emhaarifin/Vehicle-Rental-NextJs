import { CardProduct, CardContainer, Main } from '@/components';
import { axios } from '@/configs';
import Link from 'next/link';
function VehicleType({ category }) {
  return (
    <Main>
      <br></br>
      {category?.map((resC, index) => {
        let NC = resC.name_category.toLowerCase();
        return (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-36 font-playfair">{resC.name_category}</p>
              <Link href={`/view-all/${NC}`}>
                <a className="text-16 c-primary">View all</a>
              </Link>
            </div>
            <CardContainer key={index}>
              {resC?.vehicles?.map((item, i) => {
                return (
                  <>
                    <CardProduct
                      href={`/vehicle/${item.id}`}
                      key={i}
                      image={item.image[0]}
                      alt={item.name}
                      name={item.name}
                      location={item.location}
                    ></CardProduct>
                  </>
                );
              })}
            </CardContainer>
          </>
        );
      })}
    </Main>
  );
}

export default VehicleType;

export async function getServerSideProps() {
  const resCategory = await axios.get(`/category`);
  const category = await resCategory.data.result;
  await Promise.all(
    category.map(async (item, index) => {
      const response = await axios.get(`/vehicle?limit=4&table=category&search=${item.name_category}`);
      const todo = await response;
      category[index].vehicles = todo.data.data;
    })
  );
  return {
    props: { category },
  };
}
