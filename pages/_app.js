/* eslint-disable @next/next/no-page-custom-font */

import '../styles/globals.css';
import '../styles/color.css';
import '../styles/typography.css';
import Head from 'next/head';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <>
      <Provider store={store}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&family=Nunito:wght@200;300;400;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
export default MyApp;
