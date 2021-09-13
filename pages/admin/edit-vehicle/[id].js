/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { axios, privateRouteAdmin } from '@/configs';
import { Input, Button, Main } from '@/components';
import styled from 'styled-components';
import { customMedia } from '../../../styles/breakpoint';
import swal from 'sweetalert';
import { useState } from 'react';
function Index({ vehicleItem, data, dataLocation }) {
  const { location_id, category_id, name, description, price, status, stock, image } = vehicleItem.result[0];

  const dataCategory = data.result;
  const locationData = dataLocation.result;
  const { query } = useRouter();

  const router = useRouter();
  const id = Number(query.id);
  const [vehicle, setVehicle] = useState({
    location_id: location_id,
    category_id: category_id,
    name: name,
    description: description,
    price: price,
    status: status,
    stock: stock,
  });

  const handleStock = (params) => {
    if (params === 'plus') {
      setVehicle({
        ...vehicle,
        stock: vehicle.stock + 1,
      });
    }
    if (params === 'minus' && vehicle.stock > 1) {
      setVehicle({
        ...vehicle,
        stock: vehicle.stock - 1,
      });
    }
  };

  const [images, setImages] = useState([]);
  const [imagesPreview] = [images.map((item) => URL.createObjectURL(item))];
  const onFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = document.querySelector('input[type="file"]').files;
    const data = new FormData();
    data.append('location_id', vehicle.location_id);
    data.append('category_id', vehicle.category_id);
    data.append('name', vehicle.name);
    data.append('description', vehicle.description);
    data.append('price', vehicle.price);
    data.append('status', vehicle.status);
    data.append('stock', vehicle.stock);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        data.append('image', files[i]);
      }
    }
    await axios
      .put(`/vehicle/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        swal('Success', result?.data?.message || 'Suskes Update Data', 'success');
      })
      .catch((error) => {
        swal('error', error?.response?.data?.message || 'Gagal Update ', 'error');
      });
  };

  const deleteVihacle = async (e) => {
    e.preventDefault();
    axios
      .delete(`/vehicle/${id}`)
      .then((result) => {
        swal('Success', result?.data?.message || 'Sukses Delete Data', 'success');
        router.push('/');
      })
      .catch((error) => {
        swal('error', error?.response?.data?.message || 'Gagal Delete', 'error');
      });
  };

  return (
    <Main>
      <p>Detail Item</p>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <StyleDetail>
          <div className="left">
            <div className="image">
              <div className="main-image">
                <img src={imagesPreview[0] ? imagesPreview[0] : image[0]} alt="aa"></img>
              </div>
              <div className="second-image second">
                <div className="second">
                  <img src={imagesPreview[1] ? imagesPreview[1] : image[1]} alt="aa"></img>
                </div>
                <div className="second">
                  <div className="input-files">
                    <label className="label">
                      <img src={imagesPreview[2] ? imagesPreview[2] : image[2]} alt="aa"></img>
                      <Input
                        multiple
                        id="image"
                        type="file"
                        name="image"
                        onChange={(e) => onFileChange(e)}
                        element="input"
                        placeholder="url image product"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Input
              name="name"
              className="input text"
              onChange={handleChange}
              value={vehicle.name}
              placeholder="Name (max up to 50 words)"
              maxlength="50"
            ></Input>
            <select className="input text" onChange={handleChange} placeholder="Location" name="location_id">
              {locationData &&
                locationData.map((item) => {
                  return (
                    <>
                      <option key={item.id} name="category_id" value={item.id}>
                        {item.name_location}
                      </option>
                    </>
                  );
                })}
            </select>
            <Input
              className="input text"
              name="description"
              value={vehicle.description}
              onChange={handleChange}
              placeholder="Description"
            ></Input>
            <div className="my-choice">
              <label htmlFor="price">Price:</label>
              <Input
                className="input ps-3 bg__gray"
                name="price"
                value={vehicle.price}
                onChange={handleChange}
                id="price"
                placeholder="Type the price"
              ></Input>
            </div>
            <div className="status my-choice">
              <label htmlFor="status">Status: </label>
              <select
                value={vehicle.status}
                onChange={handleChange}
                className="bg__gray ps-3"
                id="status"
                name="status"
              >
                <option value="" selected disabled hidden>
                  Select status
                </option>
                <option name="status" value="Available">
                  Available
                </option>
                <option name="status" value="Full Booked">
                  Full Booked
                </option>
              </select>
            </div>
            <div className="stock-item">
              <label htmlFor="stock">Stock:</label>
              <div className="stock-vehicle">
                <Button type="button" onClick={() => handleStock('plus')} className="btn-plus bg__primary">
                  +
                </Button>
                <Input name="stock" value={vehicle.stock} onChange={handleChange} type="number"></Input>
                <Button type="button" onClick={() => handleStock('minus')} className="btn-minus bg__gray">
                  -
                </Button>
              </div>
            </div>
          </div>
        </StyleDetail>
        <StyleButton className="choice-item">
          <select
            value={vehicle.category_id}
            onChange={handleChange}
            className="bg__black text-24 c-primary choice-item"
            id="category_id"
            name="category_id"
          >
            {dataCategory &&
              dataCategory.map((item) => {
                return (
                  <>
                    <option key={item.id} name="category_id" value={item.id}>
                      {item.name_category}
                    </option>
                  </>
                );
              })}
          </select>
          <Button type="submit" className="text-24 bg__primary choice-item">
            Save Change
          </Button>
          <Button onClick={deleteVihacle} className="text-24 bg__black text-24 c-primary choice-item">
            Delete
          </Button>
        </StyleButton>
      </form>
    </Main>
  );
}

export default Index;

const StyleDetail = styled.div`
  ${customMedia.greaterThan('media_md')`
  display: flex;
  gap: 2rem;
  `}
  .left {
    height: 100%;
    flex: 1;
    .image {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      .main-image {
        background: red;
        height: 25.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f5f5f6;
        img{
          width: 100%;
          height: 100%;
          border-radius: 10px;
          object-fit: cover;
        }
      }
      .second-image {
        display: flex;
        gap: 1.5rem;
        .second {
        height: 10.25rem;
          background: #f5f5f6;
        }
        .second:nth-child(1) {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 10px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
          }
        }
        .second:nth-child(2) {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 10px;
          .input-files{
            display:flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items:center;
            .label {
              display: inline-block;
              position: relative;
              width: 100%;
              height: 100%;

              img{
                width: 100%;
                border-radius: 10px;
                height: 100%;
                object-fit: cover;
              }
              input[type='file'] {
                position: absolute;
                left: 0;
                opacity: 0;
                cursor: pointer;
                top: 0;
                width: 100%;
                height: 100%;
                bottom: 0;
              }
            }
          }
        }
      }
    }
    button {
      padding: 1.35rem;
    }
  }
  .right {
    .my-choice {
      display: flex;
      flex-direction: column;
    }
    ${customMedia.greaterThan('media_md')`
    display:flex;
    flex-direction: column;
    gap: 1rem;
    `}
    ${customMedia.lessThan('media_md')`
    margin-top: 1.8rem;
    display:flex;
    flex-direction: column;
    gap: 1.5rem;
    `}
    #status {
      padding: 1rem 0;
      width: 100%;
      border: unset;
      border-radius: 10px;
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2pt #ffcd61;
      }
    }
    
    .input {
      padding: 1rem 0;
    }
    .text {
      border-radius: unset;
      border-bottom: 1px solid #000000;
    }
    flex: 1;
    .price {
      ${customMedia.greaterThan('media_md')`
      text-align: center;
      `}
    }
    }
    .stock-item{
      display: flex;
      justify-content: space-between;
    .stock-vehicle {
      display: flex;
      input {
        width: unset;
        text-align: center;
      }
      .btn-plus, .btn-minus {
        width: 30px;
        height: 30px;
      }
    }}
  }
`;

const StyleButton = styled.div`
  ${customMedia.greaterThan('media_md')`
display: flex;
gap: 2.5rem;
`}
  ${customMedia.lessThan('media_md')`
display: flex;
flex-direction: column;
gap: 1.5rem;
`}
  margin-top: 5rem;
  .choice-item:nth-child(1) {
    flex: 1 20%;
  }
  .choice-item:nth-child(2) {
    flex: 2;
    box-shadow: 0px 0px 20px rgba(251, 143, 29, 0.4);
  }
  .choice-item:nth-child(3) {
    flex: 1 20%;
  }
  button {
    padding: 1.35rem;
  }
`;

export const getServerSideProps = privateRouteAdmin(async (context) => {
  const { id } = context.params;
  const res = await axios.get(`http://localhost:4000/vehicle/${id}`);
  const { data } = await axios.get(`http://localhost:4000/category`);
  const data2 = await axios.get(`http://localhost:4000/location`);
  const dataLocation = await data2.data;
  const vehicleItem = await res.data;
  return {
    props: { vehicleItem, data, dataLocation },
  };
});
