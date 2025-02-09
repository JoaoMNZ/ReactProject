import React from 'react'
import { DatabaseContext } from './Database';
import { Link, useParams } from 'react-router-dom';
import styles from './Task.module.css'


const Task = () => {
    const {tasks, setTasks, currentUser} = React.useContext(DatabaseContext);
    const { id } = useParams();
    const [currentTask, setCurrentTask] = React.useState(null)
    const [edit, setEdit] = React.useState(false);
    const [editInput, setEditInput] = React.useState(null);
    const [editDeadline, setEditDeadline] = React.useState(null);
    const [editDescription, setEditDescription] = React.useState(null);

    React.useEffect(() => {
        const userTasks = tasks.get(currentUser) || [];
        const foundTask = userTasks.find((task) => task.id === Number(id));
        setCurrentTask(foundTask);
        setEditInput(foundTask.nome)
        setEditDeadline(foundTask.deadline)
        setEditDescription(foundTask.description)
        setEdit
    }, [tasks]);

    function editTask() {
        const currentUserTasks = tasks.get(currentUser) || [];
        const updatedUserTasks = currentUserTasks.map((task) => task.id === Number(id) ? { ...task, nome: editInput, description: editDescription, deadline: editDeadline} : task)
        const updatedTasks = new Map(tasks);
        updatedTasks.set(currentUser, updatedUserTasks);
        setTasks(updatedTasks);
    }
    
    function handleChangeInput({target}){
        setEditInput(target.value);
    }

    function handleChangeDate({target}){
        setEditDeadline(target.value);
    }

    function handleChangeDescription({target}){
        setEditDescription(target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        editTask()
        setEdit(false)
    }

    if (!currentTask) {
        return <p>Task not found</p>;
    }
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <Link to='/home' className={styles.headerText}>Return</Link>
                    <p className={styles.headerText} onClick={() => setEdit(true)}>{edit ? "Press enter to save" : "Edit"}</p>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {edit ? <input type="text" id="name" value={editInput} onChange={handleChangeInput} required maxLength="32"/> : <h5>{currentTask.nome}</h5>}
                    {edit ? <input type="date" id="deadline" value={editDeadline} onChange={handleChangeDate}/> : <p className={styles.formText}>Prazo: {currentTask.deadline}</p>}
                    {edit ? <input type="text" id="description" value={editDescription} placeholder="Type the new task description" onChange={handleChangeDescription}/> : <div className={styles.description}><p>{currentTask.description}</p></div>}
                    <button></button>
                </form>
                
            </div>
        </div>
    )
}

export default Task