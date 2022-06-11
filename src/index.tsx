import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { PlaidProvider } from './state';
import store from './reducers/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PlaidProvider>
        <CssBaseline enableColorScheme>
          <App />
        </CssBaseline>
      </PlaidProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
