import Image from 'next/image';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
import { useRouter } from 'next/router';
import ass from '../../public/asset/images/hero-home-after.svg';
import { brand, twitter, facebook, instagram, linkedin, youtube } from '../../public/asset';
function Footer() {
  const router = useRouter();
  console.log(router);
  const destinations = ['Bali', 'Yogyakarta', 'Jakarta', 'Kalimantan', 'Malang'];
  const vehicle = ['Bike', 'Cars', 'Motorbike', 'Return Times', 'FAQs'];
  const interests = ['Adventure Travel', 'Art And Culture', 'Wildlife And Nature', 'Family Holidays', 'Culinary Trip'];
  const socialmedia = [twitter, facebook, instagram, linkedin, youtube];

  return (
    <>
      <SytleFooter>
        <div className="wrapper">
          <div className="identity">
            <Image src={brand} alt="brand icon"></Image>
            <div className="indentity-text">
              <p className="text-18 c-light">
                Plan and book your perfect trip with expert advice, travel tips for vehicle information from us
              </p>
              <p className="text-18 c-light">©2020 Vehicle Rental Center. All rights reserved</p>
            </div>
          </div>
          <div className="destinations">
            <p className="text-18 text-bold">Destinations</p>
            {destinations.map((item, index) => {
              return (
                <p key={index} className="text-18 c-light">
                  {item}
                </p>
              );
            })}
          </div>
          <div className="vehicle">
            <p className="text-18 text-bold">Vehicle</p>
            {vehicle.map((item, index) => {
              return (
                <p key={index} className="text-18 c-light">
                  {item}
                </p>
              );
            })}
          </div>
          <div className="interest">
            <p className="text-18 text-bold">Interest</p>
            {interests &&
              interests.map((item, index) => {
                return (
                  <p key={index} className="text-18 c-light">
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
        <hr></hr>
        <div className="social-media">
          {socialmedia &&
            socialmedia.map((item, index) => {
              return <Image src={item} alt="Social Media" key={index}></Image>;
            })}
        </div>
      </SytleFooter>
    </>
  );
}

export default Footer;
const SytleFooter = styled.footer`
  padding: 5rem;
  hr {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
  ${customMedia.lessThan('media_sm')`
  padding: 1rem;`}
  .wrapper {
    display: flex;
    justify-content: space-between;

    ${customMedia.lessThan('media_md')`
  flex-direction: column;
  `}
    .identity {
      max-width: 391px;
      .indentity-text {
        margin-top: 1rem;
      }
    }
  }
  .social-media {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 250px;
  }
`;
