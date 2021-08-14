import Image from 'next/image';
import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';

function Button(props) {
  if (props.icon) {
    return (
      <>
        <StyleButton onClick={props.onClick} disabled={props.disabled} style={props.style}>
          <Image width={props.width} height={props.height} src={props.Image} alt="btn-only-icon"></Image>
        </StyleButton>
      </>
    );
  } else if (props.iconText) {
    return (
      <>
        <StyleButton onClick={props.onClick} disabled={props.disabled} style={props.style}>
          <Image width={props.width} height={props.height} src={props.Image} alt="btn-with-text-icon"></Image>
          {props.children}
        </StyleButton>
      </>
    );
  }
  return (
    <>
      <StyleButton onClick={props.onClick} disabled={props.disabled} style={props.style}>
        {props.children}
      </StyleButton>
    </>
  );
}

export default Button;

const StyleButton = styled.button`
  width: 100%;
  border: unset;
  border-radius: 10px;
`;
