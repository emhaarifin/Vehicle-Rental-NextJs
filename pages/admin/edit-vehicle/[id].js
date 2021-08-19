/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import axios from 'axios';
import Main from '../../../components/templates/Main';
// import Link from 'next/link';
// import { camera } from '../../../public/asset';
import camera from '../../../public/asset/images/camera.svg';
import styled from 'styled-components';
import { customMedia } from '../../../styles/breakpoint';
import Image from 'next/image';
import Input from '../../../components/atoms/Input';

import { frame1, frame2 } from '../../../public/asset';
import Button from '../../../components/atoms/Button';
import { useState, useEffect } from 'react';
function Index(vehicleItem) {
  const { location_id, category_id, name, description, price, status, stock, image } = vehicleItem.result[0];
  console.log(image);
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

  const [images, setImages] = useState([]);
  const [imagesPreview] = [images.map((item) => URL.createObjectURL(item))];
  console.log(imagesPreview[0]);
  const onFileChange = (e) => {
    setImages([...e.target.files]);
    console.log(images, 'mes');
  };

  const handleChange = (e) => {
    e.preventDefault();
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });

    console.log(e, vehicle.image, 'e');
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
      .put(`http://localhost:4000/vehicle/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        alert(result?.data?.message || 'Sukses Update');
      })
      .catch((error) => {
        alert(error?.response?.data?.message || 'Gagal Update');
      });
  };

  const deleteVihacle = async (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/vehicle/${id}`)
      .then((result) => {
        alert(result?.data?.message || 'Sukses Delete Data');
        router.push('/');
      })
      .catch((error) => {
        alert(error?.response?.data?.message || 'Gagal Delete');
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
                  <img src={imagesPreview[1] ? imagesPreview[1] : image[1]} width="290px" height="164px" alt="aa"></img>
                </div>
                <div className="second">
                  <img src={imagesPreview[2] ? imagesPreview[2] : image[2]} width="290px" height="164px" alt="aa"></img>
                </div>
              </div>
            </div>
            <div className="input-files">
              <label className="label">
                <div>Click to update image</div>
                <Input multiple id="image" type="file" name="image" onChange={(e) => onFileChange(e)} element="input" />
              </label>
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
            <Input className="input text" onChange={handleChange} placeholder="Location" name="location_id"></Input>
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
                <Button className="btn-plus bg__primary">+</Button>
                <Input name="stock" value={vehicle.stock} onChange={handleChange} type="number"></Input>
                <Button className="btn-minus bg__gray">-</Button>
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
            <option value="" disabled hidden>
              Choose Category
            </option>
            <option name="category_id" value="2">
              Cars
            </option>
            <option name="category_id" value="1">
              Bike
            </option>
            <option name="category_id" value="3">
              Motorbike
            </option>
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

    .input-files{
      margin-top: 1rem;
      display:flex;
      justify-content: center;
      align-items:center;
      .label {
        display: inline-block;
        position: relative;
        height: 3rem;
        
        width: 20rem;
        div {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          // background: #ccc;
          border: 1px dotted #bebebe;
          border-radius: 10px;
        }
        input[type='file'] {
          position: absolute;
          left: 0;
          opacity: 0;

      cursor: pointer;
          top: 0;
          bottom: 0;
          width: 100%;
        }
      }
    }

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
        }
        .second:nth-child(2) {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
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

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await axios.get(`http://localhost:4000/vehicle/${id}`);
  const vehicleItem = await res.data;
  return {
    props: vehicleItem,
  };
}
