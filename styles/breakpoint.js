import { generateMedia } from 'styled-media-query';

export const customMedia = generateMedia({
  media_sm: '576px',
  media_md: '768px',
  media_lg: '992px',
  media_xl: '1200px',
});
