// // import { createStore, applyMiddleware } from 'redux';
// // import { composeWithDevTools } from 'redux-devtools-extension';
// // import { persistStore, persistReducer } from 'redux-persist';
// // import thunk from 'redux-thunk';
// // import storage from 'redux-persist/lib/storage';
// // import reducers from './reducers';

// // const persistConfig = {
// //   key: 'root',
// //   storage,
// // };

// // const persistedReducer = persistReducer(persistConfig, reducers);
// // const logger = composeWithDevTools();
// // let store = createStore(persistedReducer, applyMiddleware(thunk, logger));
// // let persistor = persistStore(store);

// // export { store, persistor };

// //store.ts
// import { createStore } from 'redux';
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { CookieStorage } from 'redux-persist-cookie-storage';
// import Cookies from 'cookies-js';
// import reducers from './rootReducer';
// const persistConfig = {
//     key: 'root',
//     storage: new CookieStorage(Cookies, {}),
// };
// const rootReducer = persistCombineReducers(persistConfig, reducers);
// export const reduxStore = createStore(rootReducer, composeWithDevTools());
// export const reduxPersistor = persistStore(reduxStore, {});
