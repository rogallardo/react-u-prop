import React from 'react';
import './App.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import UserEditorContainer from './components/UserEditorContainer/UserEditorContainer';
import UserCreatorContainer from './components/UserCreatorContainer/UserCreatorContainer';
import UserListContainer from './components/UserListContainer/UserListContainer';
import NavBar from './components/NavBar/NavBar';
import CalendarContainer from './components/CalendarContainer/CalendarContainer';
import Login from './components/Login/Login'
import AuthContext from './components/AuthContext/AuthContext';
import SettingsContainer from './components/SettingsContainer/SettingsContainer';
import SideBar from './components/SideBar/SideBar';
import StatisticsContainer from './components/StatisticsContainer/StatisticsContainer';
import UserCalendarContainer from './components/UserCalendarContainer/UserCalendarContainer';



function App() {
  return ( 
    <>
   
    <LocalizationProvider dateAdapter={AdapterDateFns}>
     <BrowserRouter>
     <AuthContext>
          <NavBar />
            <Routes>      
              <Route  path='/' element={<UserListContainer />}/>
              <Route  path='/user/:userId' element={<UserEditorContainer />}/>
              <Route  path='/userCreator' element={<UserCreatorContainer />}/>
              <Route  path='/calendar' element={<UserCalendarContainer />}/>
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
