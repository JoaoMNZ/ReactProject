import React from 'react'
import styles from './UserForm.module.css'

import { DatabaseContext } from './Database';
import { useNavigate } from 'react-router-dom';

const Form = ({choice}) => {
    const {users, setUsers, setCurrentUser, idCounter, setIdCounter} = React.useContext(DatabaseContext);
    const navigate = useNavigate();
    console.log(users);

    function handleSubmit(event) {
        event.preventDefault();
        if(choice === "Log in"){
            let user = users.find((user) => user.username === form.username && user.password === form.password)
            if(user){
                setCurrentUser(user.id);
                navigate('/home');
            }else{
                setMessage("Incorrect username or password.")
            }
        }else{
            if(users && users.some((user) => user.username === form.username)){
                setMessage("Username already exists, please try another.")
            }else{
                setUsers([...users, {id: idCounter, username: form.username, password: form.password}]);
                setIdCounter(idCounter + 1);
                setMessage("Account created successfully!")
            }
        }
        setForm({username: "", password: ""});
    }

    const [form, setForm] = React.useState({
        username: '',
        password: '',
      });

    const [message, setMessage] = React.useState("")

      React.useEffect(() => {
        setMessage("");
        setForm({username: "", password: ""})
    }, [choice])

    function handleChange({ target }) {
        const { id, value } = target;
        setForm({ ...form, [id]: value });
    }

    return (
        <form className={styles.userForm}onSubmit={handleSubmit}>
             <input className={styles.userInput} type="text" id="username" value={form.username} onChange={handleChange} placeholder='Username' required maxLength="8" minLength="3"/>
             <input className={styles.userInput} type="password" id="password" value={form.password} onChange={handleChange} placeholder='Password' required maxLength="8" minLength="3"/>
            <button className={styles.userButton}>{choice}</button>
            {message && <p style={{color: "#2E2E2E"}}>{message}</p>}
        </form>
    )
}

export default Form