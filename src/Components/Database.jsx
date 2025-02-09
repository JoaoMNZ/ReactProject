import React from 'react';

export const DatabaseContext = React.createContext();

export const DatabaseStorage = ({ children }) => {
    const [users, setUsers] = React.useState([]);

    const [tasks, setTasks] = React.useState(new Map())

    const [currentUser, setCurrentUser] = React.useState(null);

    const [idCounter, setIdCounter] = React.useState(0);

    return (
        <DatabaseContext.Provider value={ {users, setUsers, tasks, setTasks, currentUser, setCurrentUser, idCounter, setIdCounter} }>
            {children}
        </DatabaseContext.Provider>
    );
};