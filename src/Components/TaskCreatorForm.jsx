import React from 'react'
import styles from './TaskCreatorForm.module.css'
import { Link } from 'react-router-dom';

import { AppContext } from './Database';

const TaskCreatorForm = () => {
    const {usersTasksMap, setUsersTasksMap, loggedInUser} = React.useContext(AppContext);
    const taskIdCounter = React.useRef(0); 
    const [taskNameInput, setTaskNameInput] = React.useState("");
    const loggedInUserTasks = usersTasksMap.get(loggedInUser) || [];

    React.useEffect(() => {
        const maxId = loggedInUserTasks.reduce((max, task) => Math.max(max, task.id), 0);
        taskIdCounter.current = maxId + 1;
    }, [loggedInUserTasks]);

    const updateloggedInUserTasks = (newTasks) => {
        const updatedMap = new Map(usersTasksMap);
        updatedMap.set(loggedInUser, newTasks);
        setUsersTasksMap(updatedMap);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (taskNameInput.trim()) {
            const taskToAdd = { id: taskIdCounter.current, name: taskNameInput, description: '', deadline: '' };
            updateloggedInUserTasks([...loggedInUserTasks, taskToAdd]);
            taskIdCounter.current += 1;
            setTaskNameInput('');
        }
    };
    
    function handleDeleteTask(id) {
        const updatedTasks = loggedInUserTasks.filter(task => task.id !== id);
        updateloggedInUserTasks(updatedTasks);
    }

    function handleChange({ target }) {
        setTaskNameInput(target.value);
    }

    return (
        <form className={styles.taskCreatorForm}onSubmit={handleSubmit}>
            <div>
                <input className={styles.taskCreatorInput} type="text" id="task" value={taskNameInput} onChange={handleChange} placeholder='Type the task...' required maxLength="32"/>
                <button className={styles.taskCreatorButton}>Add</button>
            </div>
            <ul className={styles.taskCreatorUl}>
                {loggedInUserTasks.map((task) => <li className={styles.taskCreatorLi} key={task.id}><Link to={`/task/${task.id}`}>{task.name}</Link><span onClick={() => handleDeleteTask(task.id)}></span></li>)}
            </ul>
        </form>
    )
}

export default TaskCreatorForm