/* eslint-disable @next/next/no-img-element */
import Main from '../../components/templates/Main';
import { editProfile, avatarUser } from '../../public/asset';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import axios from 'axios';
import { useState } from 'react';
import { updateProfile } from '../../redux/actions/user';
import { useDispatch } from 'react-redux';
import cookies from 'next-cookies';
function Index({ DataUser }) {
  const dispatch = useDispatch();
  const id = DataUser[0].id.toString();
  const [user, setUser] = useState({
    phone_number: '',
    gender: '',
    adress: '',
    image: null,
    defaultImg: false,
    imagePreview: null,
  });

  const handleInputFile = (e) => {
    console.log(e);
    setUser({
      ...user,
      defaultImg: true,
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id, 'ddddddd');
    const data = new FormData();
    data.append('phone_number', user.phone_number);
    data.append('gender', user.gender);
    data.append('adress', user.adress);
    data.append('image', user.image);

    await axios
      .put(`http://localhost:4000/auth/profile/update/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        dispatch({ type: 'UPDATE_USER' });
        swal('Success', result?.data?.message || 'Suskes Update Data', 'success');
      })
      .catch((error) => {
        swal('error', error?.response?.data?.message || 'Gagal Update ', 'error');
      });
  };
  return (
    <Main>
      <p className="text-36 text-bold mt-5 mb-5">Profile</p>
      {DataUser &&
        DataUser.map((item, index) => {
          return (
            <>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                  <Avatar>
                    <div className="avatar-user">
                      <img
                        src={user.avatar === null || user.avatar === 'null' ? avatarUser.src : item.avatar}
                        alt="ao"
                      ></img>
                    </div>
                    <div className="edit-avatar">
                      <div>
                        <label htmlFor="avatar">
                          <img src={editProfile.src} alt="aa"></img>
                          <input type="file" id="avatar" name="image" onChange={handleInputFile}></input>
                        </label>
                      </div>
                    </div>
                  </Avatar>
                  <ShowInformation>
                    <p className="text-36 b text-bold font-playfair">{item.fullname}</p>
                    <p className="text-24 a text-bold">{item.email}</p>
                    <p className="text-24 a text-bold">{item.phone_number}</p>
                    <p className="text-24 a text-bold">Has been active since {item.created_at.slice(0, 4)}</p>
                  </ShowInformation>
                  <Gender>
                    <Input
                      CustomRadio
                      id="Male"
                      value="Male"
                      name="gender"
                      onChange={handleChange}
                      checked={item.gender === 'Male'}
                      label="Male"
                    ></Input>
                    <Input
                      CustomRadio
                      id="Female"
                      value="Female"
                      name="gender"
                      onChange={handleChange}
                      checked={item.gender === 'Female'}
                      label="Female"
                    ></Input>
                  </Gender>
                  <CandI>
                    <div className="contacts">
                      <p className="p">Contacts</p>
                      <label htmlFor="email">Email adress:</label>
                      <Input id="email" placeholder={item.email}></Input>
                      <label htmlFor="adress">Adress:</label>
                      <Input name="adress" onChange={handleChange} id="adress" placeholder={item.adress}></Input>
                      <label htmlFor="phone-numer">Mobile number:</label>
                      <Input
                        name="phone_number"
                        onChange={handleChange}
                        id="phone-number"
                        placeholder={item.phone_number}
                      ></Input>
                    </div>
                    <div className="identity">
                      <p className="p">Identity</p>
                      <div className="ii">
                        <div className="i">
                          <label htmlFor="name">Display name:</label>
                          <Input id="namer" placeholder={item.fullname}></Input>
                        </div>
                        <div className="i">
                          <label htmlFor="birthday">DD/MM/YY</label>
                          <Input id="birthday" placeholder={item.date_of_birth}></Input>
                        </div>
                      </div>
                    </div>
                  </CandI>
                  <Action>
                    <Button type="submit" className="b text-24 text-bold save">
                      Save Change
                    </Button>
                    <Button className="b text-24 text-bold edit">Edit Password</Button>
                    <Button className="b text-24 text-bold cancel">Cancel</Button>
                  </Action>
                </div>
              </form>
            </>
          );
        })}
    </Main>
  );
}

const Avatar = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  margin: 0 auto;
  .avatar-user {
    width: 100%;
    border-radius: 50%;
    background: red;
    height: 100%;
    img {
      width: 100%;
      border-radius: 50%;
      background: red;
      height: 100%;
    }
  }
  .edit-avatar {
    position: absolute;
    left: 80%;
    cursor: pointer;
    div {
      label {
        input {
          visibility: hidden;
        }
      }
    }
    max-width: fit-content;

    max-height: fit-content;
    bottom: 0;
  }
`;

const ShowInformation = styled.div`
  text-align: center;
  p {
    margin: 0;
    padding: 0;
  }
  .a {
    color: #b8becd;
  }
  .b {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`;

const Gender = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12%;
  margin-top: 7rem;
  margin-bottom: 3rem;
`;

const CandI = styled.div`
  .p {
    font-size: 24px;
    font-weight: 900;
    color: #4f5665;
  }
  input {
    padding: 0.5rem 0;
    border-bottom: 1px solid black;
    border-radius: 0;
    margin-bottom: 1rem;
  }
  .identity {
    margin-top: 2.5rem;
    .ii {
      display: flex;
      flex-direction: row;
      gap: 10rem;
      ${customMedia.lessThan('media_md')`
      gap: 5vw`}
      .i {
        flex: 1;
      }
    }
  }
`;

const Action = styled.div`
  margin-top: 3rem;
  display: flex;
  ${customMedia.lessThan('media_sm')`
  flex-direction: column;
  gap: 1rem;
  `}
  gap: 1vw;
  ${customMedia.greaterThan('media_md')`
  gap: 5rem;
  `}
  .b {
    padding: 1rem;
    border-radius: 10px;
  }
  .save {
    color: #393939;
    background: #ffcd61;
  }
  .edit {
    color: #ffcd61;
    background: #393939;
  }
  .cancel {
    color: #393939;
    background: rgba(203, 203, 212, 0.27);
  }
`;

export default Index;

export async function getServerSideProps(context) {
  const id = cookies(context).id;
  const res = await axios.get(`http://localhost:4000/auth/profile/${id}`);
  // console.log();
  const DataUser = await res.data.result;
  return {
    props: { DataUser },
  };
}
