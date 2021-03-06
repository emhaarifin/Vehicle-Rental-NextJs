/* eslint-disable @next/next/no-page-custom-font */

import '../styles/globals.css';
import '../styles/color.css';
import '../styles/typography.css';
import Head from 'next/head';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import { useStore } from '../configs/redux/store';

import NextNprogress from 'nextjs-progressbar';
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link
              href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&family=Nunito:wght@200;300;400;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
              rel="stylesheet"
            />
          </Head>
          <NextNprogress
            color="linear-gradient(91.97deg, #f8a170 14.73%, #ffcd61 97.52%)"
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
            showOnShallow={true}
            options={{ easing: 'ease', speed: 500, showSpinner: false }}
          />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
export default MyApp;
