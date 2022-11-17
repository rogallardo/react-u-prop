import React from 'react';
import './App.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import UserEditorContainer from './components/UserEditorContainer/UserEditorContainer';
import UserCreatorContainer from './components/UserCreatorContainer/UserCreatorContainer';
import UserListContainer from './components/UserListContainer/UserListContainer';
import NavBar from './components/NavBar/NavBar';
import CalendarContainer from './components/CalendarContainer/CalendarContainer';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Login from './components/Login/Login'
import AuthContext from './components/AuthContext/AuthContext';
import Settings from './components/Settings/Settings';
import SettingsContainer from './components/SettingsContainer/SettingsContainer';
import SideBar from './components/SideBar/SideBar';
import Estadisticas from './components/Statistics/Statistics';
import StatisticsContainer from './components/StatisticsContainer/StatisticsContainer';



function App() {
  return ( 
    <>
   
    <LocalizationProvider dateAdapter={AdapterDateFns}>
     <BrowserRouter>
     <AuthContext>
          
          <SideBar />
          <NavBar />
            <Routes>      
              <Route  path='/' element={<UserListContainer />}/>
              <Route  path='/status/:statusId' element={<UserListContainer />}/>
              <Route  path='/user/:userId' element={<UserEditorContainer />}/>
              <Route  path='/userCreator' element={<UserCreatorContainer />}/>
              <Route  path='/calendar' element={<CalendarContainer />}/>
              <Route  path='/settings' element={<SettingsContainer />}/>
              <Route  path='/login' element={<Login />}/>
              <Route  path='/statistics' element={<StatisticsContainer />}/>
           
            </Routes>
         </AuthContext>
     </BrowserRouter>
     </LocalizationProvider>
     

    
    </>
    
)}

export default App;
