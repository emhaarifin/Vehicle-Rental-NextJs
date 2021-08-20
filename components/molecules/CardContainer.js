import styled from 'styled-components';
import { customMedia } from '../../styles/breakpoint';

function CardContainer(props) {
  return <ContainerCard>{props.children}</ContainerCard>;
}

export default CardContainer;

const ContainerCard = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  ${customMedia.lessThan('media_sm')`
  gap: 0rem;
`}
  // ${customMedia.lessThan('media_sm')`
//   gap: 0rem;
// `}
  ${customMedia.greaterThan('media_lg')`
  gap: 3rem;
`}
  ${customMedia.greaterThan('media_xl')`
  // justify-content: space-between
  // gap: 4.5rem;
  gap: 4.91rem;
`}
${customMedia.greaterThan('1800px')`
ju
`}
`;
