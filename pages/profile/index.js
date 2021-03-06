/* eslint-disable @next/next/no-img-element */
import { editProfile, avatarUser } from '@/asset';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import { Input, Button, Main } from '@/components';
import { axios, privateRoute, getUserById } from '@/configs';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'next-cookies';

function Index({ DataUser: ResUser, userId }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [dataUser, setDataUser] = useState(ResUser);
  const [reset, setReset] = useState(false);
  const [user, setUser] = useState({
    phone_number: '',
    gender: '',
    adress: '',
    image: null,
    defaultImg: false,
    imagePreview: null,
  });

  const getUser = async () => {
    await dispatch(getUserById(userId));
    setDataUser(userData);
  };
  useEffect(() => {
    getUser();
  }, [reset]);
  const handleInputFile = (e) => {
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
    const data = new FormData();
    data.append('phone_number', user.phone_number);
    data.append('gender', user.gender);
    data.append('adress', user.adress);
    data.append('image', user.image);
    await axios
      .put(`/auth/profile/update/${userId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        dispatch({ type: 'UPDATE_USER', payload: data });
        swal('Success', result?.data?.message || 'Suskes Update Data', 'success');
        setReset(!reset);
      })
      .catch((error) => {
        swal('error', error?.response?.data?.message || 'Gagal Update ', 'error');
      });
  };
  return (
    <Main avatar={user.imagePreview}>
      <p className="text-36 text-bold mt-5 mb-5">Profile</p>
      {dataUser &&
        dataUser?.map((item) => {
          return (
            <form key={item.id} onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <Avatar>
                  <div className="avatar-user">
                    <img
                      src={user.defaultImg ? user.imagePreview : item.avatar ? item.avatar : avatarUser.src}
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
                    customradio="true"
                    id="Male"
                    value="Male"
                    name="gender"
                    onChange={handleChange}
                    checked={item.gender === 'Male' ? true : false}
                    label="Male"
                  ></Input>
                  <Input
                    customradio="true"
                    id="Female"
                    value="Female"
                    name="gender"
                    onChange={handleChange}
                    checked={item.gender === 'Female' ? true : false}
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
    height: 100%;
    img {
      object-fit: cover;
      width: 100%;
      border-radius: 50%;
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
          display: none;
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

export const getServerSideProps = privateRoute(async (context) => {
  const id = cookies(context).id;
  const res = await axios.get(`/auth/profile/${id}`);
  const DataUser = await res.data.result;
  return {
    props: { DataUser, userId: id },
  };
});
