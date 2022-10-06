import React from 'react';
import './App.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import UserEditContainer from './components/UserEditContainer/UserEditContainer';
import UserListContainer from './components/UserListContainer/UserListContainer';
import Test from './components/test/Test';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



function App() {
  return ( 

    <>
    <LocalizationProvider dateAdapter={AdapterDateFns}>

    
     <BrowserRouter>
        <NavBar />
        <Routes>
            <Route  path='/' element={<HomePage />}/>
            <Route  path='/userList' element={<UserListContainer />}/>
            <Route  path='/status/:statusId' element={<UserListContainer />}/>
            <Route  path='/userEdit' element={<UserEditContainer />}/>
            <Route  path='/test' element={<Test />}/>
           
         </Routes>
     
     </BrowserRouter>
     </LocalizationProvider>

    
    </>
    
)}

export default App;
