import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {setProducts} from "./firebase/firebaseDBService";

const container = document.getElementById('root')!;
const root = createRoot(container);

setProducts().then(() =>
    root.render(
        <Provider store={store}>
            <BrowserRouter><App/></BrowserRouter>
        </Provider>
    )
)

