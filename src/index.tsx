import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { PlaidProvider } from './state';
import store from './reducers/store';
import AlertProvider from './components/AlertProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PlaidProvider>
        <AlertProvider>
          <CssBaseline enableColorScheme>
            <App />
          </CssBaseline>
        </AlertProvider>
      </PlaidProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
