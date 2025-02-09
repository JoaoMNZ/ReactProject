import React from 'react'
import styles from './Home.module.css'
import TaskForm from './TaskForm'

import { DatabaseContext } from './Database';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {currentUser, setCurrentUser} = React.useContext(DatabaseContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if ((currentUser === null)) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  if ((currentUser === null)) {
    return null; 
  }
  
  function handleClick(){
    setCurrentUser(null);
    navigate("/");
  }
  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <p onClick={handleClick}>Exit</p>
            <h4>Create a new task</h4>
            <TaskForm/>
        </div>
    </div>
  )
}

export default Home