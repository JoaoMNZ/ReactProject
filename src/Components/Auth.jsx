import styles from './Auth.module.css'
import React from 'react'
import AuthForm from './AuthForm'
import { Link } from 'react-router-dom'
import Head from './Head'

const Auth = ({authType}) => {
  return (
    <div className={styles.authPage}>
      <Head title={`Task list | ${authType}`} description={`Task list | ${authType}`}/>
        <div className={styles.authFormContainer}>
            <h4 className={styles.authTitle}>{authType}</h4>
            <AuthForm authType={authType}/>
            {authType === "Log in" ? 
            <p className={styles.authLinkText}>Don't have an account? <Link to="register"><span className={styles.authLink}>Sign up</span></Link></p> : 
            <p className={styles.authLinkText}>Already have an account? <Link to="/"><span className={styles.authLink}>Log in</span></Link></p>}
        </div>
    </div>
  )
}

export default Auth