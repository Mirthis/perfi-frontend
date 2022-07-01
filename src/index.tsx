import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './reducers/store';
import AlertProvider from './components/AlertProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider>
        <CssBaseline enableColorScheme>
          <App />
        </CssBaseline>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
