import Image from 'next/image';

import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';
function Input(props) {
  if (props.withImg) {
    return (
      <>
        <StyleInput
          className={props.className}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
        ></StyleInput>
        <Image src={props.image} width={props.widthImg} height={props.heightImg} alt={props.alt}></Image>
      </>
    );
  }
  return (
    <>
      <StyleInput
        className={props.className}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
      ></StyleInput>
    </>
  );
}

export default Input;

const StyleInput = styled.input`
  width: 100%;
  border: unset;
  border-radius: 10px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2pt #ffcd61;
  }
`;
