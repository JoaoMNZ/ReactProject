import './App.css'
import Auth from "./Components/Auth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DatabaseStorage } from './Components/Database';
import Home from './Components/Home';
import Task from './Components/Task';

function App() {
  return (
    <DatabaseStorage>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth choice="Log in"/>} />
          <Route path="register" element={<Auth choice="Sign up"/>} />
          <Route path="home" element={<Home/>} />
          <Route path="task/:id" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </DatabaseStorage>
  )
}

export default App
 