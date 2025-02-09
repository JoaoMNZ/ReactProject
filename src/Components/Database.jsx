import React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [users, setUsers] = React.useState([]);
    const [userIdCounter, setUserIdCounter] = React.useState(0);
    const [loggedInUser, setLoggedInUser] = React.useState(null);
    const [usersTasksMap, setUsersTasksMap] = React.useState(new Map())

    return (
        <AppContext.Provider value={ {users, setUsers, userIdCounter, setUserIdCounter, loggedInUser, setLoggedInUser, usersTasksMap, setUsersTasksMap} }>
            {children}
        </AppContext.Provider>
    );
};