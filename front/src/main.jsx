import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import { Blog } from './Blog';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Blog />
    </Provider>
  </BrowserRouter>
);
