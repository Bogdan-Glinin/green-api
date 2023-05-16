import whatsAppClient from "@green-api/whatsapp-api-client";
import s from "../components/whatsApp/WhatsApp.module.css"
import classes from "../components/Messenger/Messenger.module.css"
import Chat from "../components/Chats/Chat";
import { NavLink, Route } from "react-router-dom";

const store = {

  _state: {
    idInstance: '',
    apiTokenInstance: '',
    message: '',
    messenger: [],
    phoneNumber: '',
    currentPhoneNumber: "",
    chats: [
    ],
    users: [],
  },

  getState() {
    return this._state;
  },

  sendMessage() {
    const restAPI = whatsAppClient.restAPI(({
      idInstance: this._state.idInstance,
      apiTokenInstance: this._state.apiTokenInstance
    }))
    const message = this._state.message;
    restAPI.message.sendMessage(`${this._state.currentPhoneNumber}@c.us`, null, message).then((data) => { console.log(data); }).catch(e => { console.error(e) });
    this.refresh();
    this._state.message = '';
    this._callSubscriber();
  },

  _callSubscriber() {
    console.log("state was changed");
  },


  subscribe(observer) {
    this._callSubscriber = observer;
  },

  getMessageText(text) {
    this._state.message = text;
    this._callSubscriber();
  },

  _renderMessages() {
    let MessageElement = this._state.chats.map(chat => {
      if (chat.phoneNumber == this._state.currentPhoneNumber) {
        if (chat.type == "sended") return (<div className={classes.sendMessage__container}><div className={classes.sendedMessage}>{chat.message}</div></div>)
        else if (chat.type == "received") return (<div><div className={classes.receivedMessages}>{chat.message}</div></div>)
      }
    });
    return (MessageElement)
  },

  refresh() {
    (async () => {
      const restAPI = whatsAppClient.restAPI(({
        idInstance: this._state.idInstance,
        apiTokenInstance: this._state.apiTokenInstance
      }))


      try {

        // Receive WhatsApp notifications. Method waits for 20 sec and returns empty string if there were no sent messages
        console.log("Waiting incoming notifications...")
        let response
        while (response = await restAPI.webhookService.receiveNotification()) {
          let webhookBody = response.body;
          if (webhookBody.typeWebhook === 'outgoingAPIMessageReceived') {
            console.log('outgoingAPIMessageReceived')
            this._state.chats.push({ phoneNumber: this._state.currentPhoneNumber, message: webhookBody.messageData.extendedTextMessageData.text, type: "sended" });
            this._renderMessages();
            this._callSubscriber();
            // Confirm WhatsApp message. Each received message must be confirmed to be able to consume next message
            await restAPI.webhookService.deleteNotification(response.receiptId);
          } else if (webhookBody.typeWebhook === 'incomingMessageReceived') {
            let sender = webhookBody.senderData.chatId.slice(0, 11);
            if(this._state.users.includes(sender)){
              this._state.chats.push({ phoneNumber: webhookBody.senderData.chatId.slice(0, 11), type: "received", message: webhookBody.messageData.textMessageData.textMessage });
              this._renderMessages();
              this._callSubscriber();
            }
            else{
              this._state.phoneNumber = sender;
              this._state.chats.push({ phoneNumber: webhookBody.senderData.chatId.slice(0, 11), type: "received", message: webhookBody.messageData.textMessageData.textMessage });
              this.createChat();
              console.log(this._state);
              this._renderMessages();
              this._callSubscriber();
            }

            // Confirm WhatsApp message. Each received message must be confirmed to be able to consume next message
            await restAPI.webhookService.deleteNotification(response.receiptId);
          } else if (webhookBody.typeWebhook === 'stateInstanceChanged') {
            console.log('stateInstanceChanged')
            console.log(`stateInstance=${webhookBody.stateInstance}`)
          } else if (webhookBody.typeWebhook === 'outgoingMessageStatus') {
            console.log('outgoingMessageStatus')
            console.log(`status=${webhookBody.status}`)
            await restAPI.webhookService.deleteNotification(response.receiptId);
          } else if (webhookBody.typeWebhook === 'deviceInfo') {
            console.log('deviceInfo')
            console.log(`status=${webhookBody.deviceData}`)
          }
        }
      } catch (ex) {
        console.error(ex)
      }
      console.log("End")

    })()
  },

  getIdInstance(text) {
    this._state.idInstance = text;
    this._callSubscriber();
  },

  getApiTokenInstance(text) {
    this._state.apiTokenInstance = text;
    this._callSubscriber();
  },

  getPhoneNumber(text) {
    this._state.phoneNumber = text;
    this._callSubscriber();
  },

  createChat() {
    this._state.users.push(this._state.phoneNumber);
    this._state.currentPhoneNumber = this._state.phoneNumber;
    this._state.phoneNumber = "";
    this.chat();
    this._callSubscriber();
  },

  chat() {
    let chats = this._state.users.map(chat => (<Chat rerender={this._callSubscriber.bind(store)} state={this.getState()} phoneNumber={chat} />));
    return (chats);
  }

}

export default store;