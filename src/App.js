import React from 'react';
import './App.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import UserEditContainer from './components/UserEditContainer/UserEditContainer';
import UserListContainer from './components/UserListContainer/UserListContainer';
import NavBar from './components/NavBar/NavBar';
import CalendarContainer from './components/CalendarContainer/CalendarContainer';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Login from './components/Login/Login'
import AuthContext from './components/AuthContext/AuthContext';



function App() {
  return ( 
    <>
   
    <LocalizationProvider dateAdapter={AdapterDateFns}>
     <BrowserRouter>
     <AuthContext>
          <NavBar />
        <Routes>
           
            <Route  path='/' element={<UserListContainer />}/>
            <Route  path='/status/:statusId' element={<UserListContainer />}/>
            <Route  path='/userEdit' element={<UserEditContainer />}/>
            <Route  path='/calendar' element={<CalendarContainer />}/>
           
            <Route  path='/login' element={<Login />}/>
         </Routes>
         </AuthContext>
     </BrowserRouter>
     </LocalizationProvider>
     

    
    </>
    
)}

export default App;
