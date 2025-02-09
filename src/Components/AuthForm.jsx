import React from 'react'
import styles from './AuthForm.module.css'

import { AppContext } from './Database';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({authType}) => {
    const {users, setUsers, userIdCounter, setUserIdCounter, setLoggedInUser} = React.useContext(AppContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    });

    const [feedbackMessage, setfeedbackMessage] = React.useState("")

    React.useEffect(() => {
        setfeedbackMessage("");
        setFormData({username: "", password: ""})
    }, [authType])

    function handleSubmit(event) {
        event.preventDefault();
        if(authType === "Log in"){
            const foundUser = users.find((user) => user.username === formData.username && user.password === formData.password)
            if(foundUser){
                setLoggedInUser(foundUser.id);
                navigate('/home');
            }else{
                setfeedbackMessage("Incorrect username or password.")
            }
        }else{
            if(users && users.some((user) => user.username === formData.username)){
                setfeedbackMessage("Username already exists, please try another.")
            }else{
                setUsers([...users, {id: userIdCounter, username: formData.username, password: formData.password}]);
                setUserIdCounter(userIdCounter + 1);
                setfeedbackMessage("Account created successfully!")
            }
        }
        setFormData({username: "", password: ""});
    }

    function handleChange({ target }) {
        const { id, value } = target;
        setFormData({ ...formData, [id]: value });
    }

    return (
        <form className={styles.authForm}onSubmit={handleSubmit}>
            <input className={styles.authInput} type="text" id="username" value={formData.username} onChange={handleChange} placeholder='Username' required maxLength="8" minLength="3"/>
            <input className={styles.authInput} type="password" id="password" value={formData.password} onChange={handleChange} placeholder='Password' required maxLength="8" minLength="3"/>
            <button className={styles.authButton}>{authType}</button>
            {feedbackMessage && <p className={styles.authMessage}>{feedbackMessage}</p>}
        </form>
    )
}

export default AuthForm