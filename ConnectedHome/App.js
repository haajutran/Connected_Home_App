/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {ApplicationProvider} from 'react-native-ui-kitten';
import {mapping, light as lightTheme} from '@eva-design/eva';
import Navigator from './src/components/Navigator';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store/store';
import axios from 'axios';

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    // const {config, response} = err;
    // const isExpiredToken = checkIsExpiredToken();
    return Promise.reject(err);
  },
);

checkIsExpiredToken = () => {
  return true;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <Navigator></Navigator>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
