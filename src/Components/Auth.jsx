import styles from './Auth.module.css'
import React from 'react'
import UserForm from './UserForm'
import { Link } from 'react-router-dom';

const Auth = ({choice}) => {
  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <h4>{choice}</h4>
            <UserForm choice={choice}/>
            {choice === "Log in" ? 
            <p>Don't have an account? <Link to="register"><span>Sign up</span></Link></p> : 
            <p>Already have an account? <Link to="/"><span>Log in</span></Link></p>}
        </div>
    </div>
  )
}

export default Auth