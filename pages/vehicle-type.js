import CardProduct from '../components/molecules/CardProduct';
import Main from '../components/templates/Main';
import { facebook } from '../public/asset';

function VehicleType() {
  return (
    <Main>
      <p>vehicle type</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.7rem' }}>
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </Main>
  );
}

export default VehicleType;
