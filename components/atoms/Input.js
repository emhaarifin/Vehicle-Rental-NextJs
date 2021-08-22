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
          {...props}
        ></StyleInput>
        <Image src={props.image} width={props.widthImg} height={props.heightImg} alt={props.alt}></Image>
      </>
    );
  } else if (props.CustomRadio) {
    return (
      <>
        <CustomRadio htmlFor={props.id}>
          {props.label}
          <input
            className={(props.className, 'input')}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            type="radio"
            name={props.name}
            placeholder={props.placeholder}
            min={props.min}
            max={props.max}
            // checked={props.defaultChecked === props.value ? true : false}
            {...props}
          ></input>
          <span className="checkmark"></span>
        </CustomRadio>
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
        {...props}
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
    box-shadow: 0 0 0 0.5pt #ffcd61;
  }
`;

const CustomRadio = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  color: #393939;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default radio button */
  .input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 12%;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  &:hover .input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the radio button is checked, add a blue background */
  .input:checked ~ .checkmark {
    background-color: #393939;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #ffcd61;
  }
`;
