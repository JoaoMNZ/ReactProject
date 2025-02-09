import React from 'react'
import styles from './Home.module.css'
import TaskCreatorForm from './TaskCreatorForm'
import Head from './Head'

import { AppContext } from './Database';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {loggedInUser, setLoggedInUser} = React.useContext(AppContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if ((loggedInUser === null)) {
      navigate("/");
    }
  }, [loggedInUser]);

  function handleClick(){
    setLoggedInUser(null);
    navigate("/");
  }

  if ((loggedInUser === null)) {
    return null; 
  }
  return (
    <div className={styles.homePage}>
        <Head title={"Task list | Home"} description={"Task list | Home"}/>
        <div className={styles.homeFormContainer}>
            <p onClick={handleClick} className={styles.homeText}>Exit</p>
            <h4 className={styles.homeTitle}>Create a new task</h4>
            <TaskCreatorForm/>
        </div>
    </div>
  )
}

export default Home