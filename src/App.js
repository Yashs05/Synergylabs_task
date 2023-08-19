import './App.css';
import Users from './Components/Users/Users';
import Form from './Components/Form/Form';
import { useState } from 'react';
import Alert from './Components/Alert/Alert';

function App() {

  const [users, setUsers] = useState([])

  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    success: null
  })

  const [modal, setModal] = useState(false)

  const [currentUser, setCurrentUser] = useState(null)

  return (
    <div className="App">
      <Users users={users} setUsers={setUsers} setModal={setModal} setCurrentUser={setCurrentUser} setAlert={setAlert} />
      {modal ? <Form users={users} setUsers={setUsers} setAlert={setAlert} setModal={setModal} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : null}

      {alert.show ? <Alert alert={alert} setAlert={setAlert} /> : null}
    </div>
  );
}

export default App;
