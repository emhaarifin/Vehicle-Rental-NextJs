import styled from 'styled-components';

function CardContainer(props) {
  return <ContainerCard>{props.children}</ContainerCard>;
}

export default CardContainer;

const ContainerCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
`;
