import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './Components/Database';
import Auth from "./Components/Auth";
import Home from './Components/Home';
import TaskDetail from './Components/TaskDetail';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth authType="Log in"/>} />
          <Route path="register" element={<Auth authType="Sign up"/>} />
          <Route path="home" element={<Home/>} />
          <Route path="task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
 