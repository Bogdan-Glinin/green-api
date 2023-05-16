import s from "./Chat.module.css";

const Chat = (props) => {
    return (
        <input className={s.chatName} value={props.phoneNumber} onClick={(e) => {props.state.currentPhoneNumber = e.target.value; props.rerender(); console.log(props.state);}}/>    
    )
};

export default Chat;