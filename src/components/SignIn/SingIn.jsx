import s from './SignIn.module.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

const SingIn = (props) => {

    console.log(props.store);

    const idInstance = React.createRef();
    const apiTokenInstance = React.createRef();
    
    const onIdInstanceChange = () => {
        let text = idInstance.current.value;
        props.store.getIdInstance(text);
    };

    
    const onApiTokenInstanceChange = () => {
        let text = apiTokenInstance.current.value;
        props.store.getApiTokenInstance(text);
    };

    
    console.log(props.store);
    return(
        <div className={s.container}>
            <div>
                <div>Введите данные idInstance и apiTokenInstance в аккаунте Green-API</div>
                <input type="text" onChange={onIdInstanceChange} value={props.state.idInstance} ref={idInstance} className={s.idInstance} placeholder='Введите idInstance'/>
                <br />
                <input type="text" onChange={onApiTokenInstanceChange} value={props.state.apiTokenInstance} ref={apiTokenInstance} className={s.apiTokenInstance} placeholder='Введите ApiTokenInstance'/>
                <br />
                <NavLink to="/whatsApp">Перейти</NavLink>
            </div>
        </div>
    )
}

export default SingIn;