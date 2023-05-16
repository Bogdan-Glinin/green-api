import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from "./state/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntrieTrie = () =>{
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App chat={store.chat.bind(store)} createChat={store.createChat.bind(store)} state={store.getState()} store={store} refresh={store.refresh.bind(store)} sendMessage={store.sendMessage.bind(store)} renderMessages={store._renderMessages.bind(store)}/>
      </BrowserRouter>
    </React.StrictMode>
  );
};

rerenderEntrieTrie();
store.subscribe(rerenderEntrieTrie);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
