/* eslint-disable @next/next/no-img-element */
import Main from '../../../components/templates/Main';
import { editProfile, user } from '../../../public/asset';
import styled from 'styled-components';
import { customMedia } from '../../../styles/breakpoint';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/atoms/Button';

function Index() {
  return (
    <Main>
      <p className="text-36 text-bold mt-5 mb-5">Profile</p>
      <div>
        <Avatar>
          <div className="avatar-user">
            <img src={user.src} alt="ao"></img>
          </div>
          <div className="edit-avatar">
            <img src={editProfile.src} alt="aa"></img>
          </div>
        </Avatar>
        <ShowInformation>
          <p className="text-36 b text-bold font-playfair">Samantha Doe</p>
          <p className="text-24 a text-bold">Samantha@gmail.com</p>
          <p className="text-24 a text-bold">+6288888</p>
          <p className="text-24 a text-bold">Has been active since 2013</p>
        </ShowInformation>
        <Gender>
          <Input CustomRadio id="Male" label="Male"></Input>
          <Input CustomRadio id="Female" name="radio" label="Female"></Input>
        </Gender>
        <CandI>
          <div className="contacts">
            <p className="p">Contacts</p>
            <label htmlFor="email">Email adress:</label>
            <Input id="email"></Input>
            <label htmlFor="adress">Adress:</label>
            <Input id="adress"></Input>
            <label htmlFor="phone-numer">Mobile number:</label>
            <Input id="phone-number"></Input>
          </div>
          <div className="identity">
            <p className="p">Identity</p>
            <div className="ii">
              <div className="i">
                <label htmlFor="name">Display name:</label>
                <Input id="namer"></Input>
              </div>
              <div className="i">
                <label htmlFor="birthday">DD/MM/YY</label>
                <Input id="birthday"></Input>
              </div>
            </div>
          </div>
        </CandI>
        <Action>
          <Button className="b text-24 text-bold save">Save Change</Button>
          <Button className="b text-24 text-bold edit">Edit Password</Button>
          <Button className="b text-24 text-bold cancel">Cancel</Button>
        </Action>
      </div>
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
    right: 0;
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
