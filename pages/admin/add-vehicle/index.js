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
import Button from '../../../components/atoms/Button';
import { useState, useEffect } from 'react';
function Index() {
  const [vehicle, setVehicle] = useState({
    location_id: 1,
    category_id: 1,
    name: '',
    description: '',
    price: 1,
    status: 'Available',
    stock: 1,
    image: null,
    defaultImg: true,
    imagePreview: null,
  });
  const handleInputFile = (e) => {
    console.log(e);
    setVehicle({
      ...vehicle,
      defaultImg: false,
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(vehicle).forEach((key) => {
      console.log(vehicle[key]);
      formData.append(key, vehicle[key]);
    });
    console.log(formData);
    axios
      .post(`http://localhost:4000/vehicle`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        console.log(result, 'resu');
        alert('a');
      })
      .catch((error) => {
        alert('b');
        console.log(error, 'as');
        // alert(error.response.data.message);
      });
  };
  return (
    <Main>
      <p>Detail Item</p>
      <form onSubmit={() => handleSubmit} encType="multipart/form-data">
        <StyleDetail>
          <div className="left">
            <div className="image">
              <div className="main-image">
                <Image src={camera} width="130px" height="108.17px" alt="aa"></Image>
              </div>
              <div className="second-image second">
                <div className="second">
                  <Image src={camera} width="65px" height="68px" alt="aa"></Image>
                </div>
                <div className="second">
                  <Image src={camera} width="65px" height="68px" alt="aa"></Image>
                  <Input
                    multiple
                    id="image"
                    type="file"
                    name="image"
                    onChange={handleInputFile}
                    element="input"
                    placeholder="url image product"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Input
              name="name"
              className="input text"
              onChange={handleChange}
              placeholder="Name (max up to 50 words)"
              maxlength="50"
            ></Input>
            <Input className="input text" onChange={handleChange} placeholder="Location" name="location_id"></Input>
            <Input className="input text" name="category_id" onChange={handleChange} placeholder="Description"></Input>
            <div className="my-choice">
              <label htmlFor="price">Price:</label>
              <Input
                className="input ps-3 bg__gray"
                name="price"
                onChange={handleChange}
                id="price"
                placeholder="Type the price"
              ></Input>
            </div>
            <div className="status my-choice">
              <label htmlFor="status">Status: </label>
              <select className="bg__gray ps-3" id="status" name="status">
                <option>Select status</option>
                <option value="Available">Available</option>
                <option value="Full Booked">Full Booked</option>
              </select>
            </div>
            <div className="stock-item">
              <label htmlFor="stock">Stock:</label>
              <div className="stock-vehicle">
                <Button className="btn-plus bg__primary">+</Button>
                <Input name="stock" onChange={handleChange} type="number"></Input>
                <Button className="btn-minus bg__gray">-</Button>
              </div>
            </div>
          </div>
        </StyleDetail>
        <StyleButton className="choice-item ">
          <Button className="bg__black text-24 c-primary choice-item">Add to home page</Button>
          <Button type="submit" className="text-24 bg__primary choice-item">
            Save Item
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
  button {
    padding: 1.35rem;
  }
`;
