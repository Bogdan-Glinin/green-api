import React from "react";
import s from "./WhatsApp.module.css";
import { Routes, Route } from "react-router-dom";
import Messenger from "../Messenger/Messenger";

// instance manager https://console.green-api.com


const WhatsApp = (props) => {

  const phoneNumber = React.createRef();
  let chats = props.chat();

  const onPhoneNumberChange = () => {
    let text = phoneNumber.current.value;
    props.store.getPhoneNumber(text);
  };

  // Send WhatsApp message using callbacks

  return (
    <div className={s.whatsApp__container}>
      <div className={s.whatsApp__users}>
        <div className={s.chats} >
          {chats}
          <div className={s.createChat}>
            <input ref={phoneNumber} value={props.state.phoneNumber} onChange={onPhoneNumberChange} className={s.inputNumber} type="text" />
            <button className={s.createChatButton} onClick={props.createChat}>+</button>
          </div>
        </div>

      </div>
        <Messenger createChat={props.createChat} chat={props.chat} store={props.store} state={props.state} refresh={props.refresh} sendMessage={props.sendMessage} renderMessages={props.renderMessages} />
    </div>
  )
};

export default WhatsApp;