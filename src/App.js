import logo from './logo.svg';
import './App.css';
import { rerenderEntrieTrie } from './index';
import { Routes, Route} from "react-router-dom"
import SingIn from './components/SignIn/SingIn';
import WhatsApp from './components/whatsApp/WhatsApp';

function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SingIn store={props.store} state={props.state}/>}/>
        <Route path='/whatsApp' element={<WhatsApp createChat={props.createChat} chat={props.chat} store={props.store} state={props.state} refresh={props.refresh} sendMessage={props.sendMessage} renderMessages={props.renderMessages} />}/>
      </Routes>
    </div>
  );
}

export default App;
