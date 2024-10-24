import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store/store.js';
import App from './App.jsx';
import Header from './components/Header/Header';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);