import React from 'react'
import styles from './TaskForm.module.css'
import { Link } from 'react-router-dom';

import { DatabaseContext } from './Database';

const TaskForm = () => {
    const idCounter = React.useRef(0); 
    const {tasks, setTasks, currentUser} = React.useContext(DatabaseContext);
    const userTasks = tasks.get(currentUser) || [];
    React.useEffect(() => {
        const maxId = userTasks.reduce((max, task) => Math.max(max, task.id), 0);
        idCounter.current = maxId + 1;
    }, [userTasks]);

    function handleSubmit(event) {
        event.preventDefault();
        const newTask = { nome: taskInput, id: idCounter.current, description: "", deadline: ""};
        const updatedTask = new Map(tasks);
        const currentTasks = updatedTask.get(currentUser) || [];
        const newUserTasks = [...currentTasks, newTask];
        updatedTask.set(currentUser, newUserTasks);
        setTasks(updatedTask);
        idCounter.current += 1;
        setTaskInput("");
      }
    

    const [taskInput, setTaskInput] = React.useState("");

    function handleChange({ target }) {
        setTaskInput(target.value);
    }

    function handleTask(id) {
        const currentUserTasks = tasks.get(currentUser) || [];
        const updatedUserTasks = currentUserTasks.filter((task) => task.id !== id);
        const updatedTasks = new Map(tasks);
        updatedTasks.set(currentUser, updatedUserTasks);
        setTasks(updatedTasks);
    }

    return (
        <form className={styles.userForm}onSubmit={handleSubmit}>
            <div>
                <input className={styles.userInput} type="text" id="task" value={taskInput} onChange={handleChange} placeholder='Type the task...' required maxLength="32"/>
                <button className={styles.userButton}>Add</button>
            </div>
            <ul>
                {userTasks.map((task) => <li key={task.id}><Link to={`/task/${task.id}`}>{task.nome}</Link><span onClick={() => handleTask(task.id)}></span></li>)}
            </ul>
            
        </form>
    )
}

export default TaskForm