import React from 'react';
import { AppContext } from './Database';
import { Link, useParams } from 'react-router-dom';
import styles from './TaskDetail.module.css';
import Head from './Head';

const TaskDetail = () => {
    const { usersTasksMap, setUsersTasksMap, loggedInUser } = React.useContext(AppContext);
    const { id } = useParams();
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [isEditMode, setIsEditMode] = React.useState(false);

    React.useEffect(() => {
        const userTasks = usersTasksMap.get(loggedInUser) || [];
        const foundTask = userTasks.find((task) => task.id === Number(id));
        if (foundTask) {
            setSelectedTask(foundTask);
        }
    }, [usersTasksMap, loggedInUser, id]);

    const updateTask = () => {
        if (!selectedTask) return; 

        const currentUserTasks = usersTasksMap.get(loggedInUser) || [];
        const updatedUserTasks = currentUserTasks.map((task) =>
            task.id === Number(id) ? selectedTask : task
        );
        const updatedTasks = new Map(usersTasksMap);
        updatedTasks.set(loggedInUser, updatedUserTasks);
        setUsersTasksMap(updatedTasks);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        updateTask();
        setIsEditMode(false);
    };

    const handleInputChange = ({ target }) => {
        const { id, value } = target;
        setSelectedTask((prevTask) => ({...prevTask, [id]: value,}));
    };

    if (!selectedTask) {
        return <p>Task not found</p>;
    }

    return (
        <div className={styles.taskDetailContainer}>
            <Head title={`Task list | ${selectedTask.name}`} description={`Task list | ${selectedTask.name}`}/>
            <div className={styles.taskDetailFormContainer}>
                <div className={styles.taskDetailHeader}>
                    <Link to="/home" className={styles.taskDetailHeaderText}>Return</Link>
                    <p className={styles.taskDetailHeaderText} onClick={() => setIsEditMode(true)}>{isEditMode ? "Press enter to save" : "Edit"}</p>
                </div>
                <form onSubmit={handleFormSubmit} className={styles.taskDetailForm}>
                    {isEditMode ? (<input type="text" id="name" value={selectedTask.name} onChange={handleInputChange} required maxLength="32"/>) : (<h5>{selectedTask.name}</h5>)}
                    {isEditMode ? (<input type="date" id="deadline" value={selectedTask.deadline} onChange={handleInputChange}/>) : (<p className={styles.taskDetailFormText}>Prazo: {selectedTask.deadline}</p>)}
                    {isEditMode ? (<input type="text" id="description" value={selectedTask.description} placeholder="Type the new task description" onChange={handleInputChange}/>) : ( <div className={styles.taskDetailFormDescription}>{selectedTask.description}</div>)}
                    <button type="submit" style={{ display: 'none' }}></button>
                </form>
            </div>
        </div>
    );
};

export default TaskDetail;