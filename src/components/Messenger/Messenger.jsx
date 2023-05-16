import React from "react";
import s from "./Messenger.module.css"

const Messenger = (props) => {

    let MessageElement = props.renderMessages();
    let messageChange = React.createRef();



    const onMessageTextChange = () => {
        let text = messageChange.current.value;
        props.store.getMessageText(text);
    }




    return (
        <div className={s.whatsApp__chat}>
            <div className={s.whatsApp__sendMessageArea}>
                <textarea ref={messageChange} className={s.sendMessageArea__textArea} onChange={onMessageTextChange} value={props.state.message} placeholder="Введите сообщение"></textarea>
                <button className={s.sendMessageArea__sendMessage} onClick={props.sendMessage}>Отправить сообщение</button>
            </div>
            <div className={s.title}>Сообщения</div>
            <div className={s.messenger}>
                {MessageElement}
            </div>
            <button onClick={props.refresh}>перезагрузить</button>
        </div>
    )
};

export default Messenger;