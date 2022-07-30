import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './reducers/store';
import AlertProvider from './components/AlertProvider';

const theme = createTheme({});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme>
            <App />
          </CssBaseline>
        </ThemeProvider>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
