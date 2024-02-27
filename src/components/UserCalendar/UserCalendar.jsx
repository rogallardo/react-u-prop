import React from 'react'
import {  useState, useEffect } from 'react'
import './UserCalendar.scss'
import User from '../User/User'
import '@fontsource/roboto/300.css';
import SearchBar from '../SearchBar/SearchBar'
import Filters from '../Filters/Filters'
import JSONsaver from './JSONsaver';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import UsersMatch from '../UsersMatch/UsersMatch'
import { format, addDays } from 'date-fns/esm';
import BtnViewAll from '../Btn-ViewAll/BtnViewAll';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function UserCalendar({ usersList, settings }) {
    const mobile = useMediaQuery('(max-width: 700px)')
    //list cloned from usersList (usersListCopy)
    // result list from filters and search bar
    //render list (usersMatch)
    const [usersListCopy, setUsersListCopy] = useState([...usersList])
    const [usersResult, setUsersResult] = useState([...usersList])
    const [usersMatch, setUsersMatch] = useState([...usersList])
    const [resetFilters, setResetFilters] = useState(false)
    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const USERS_PER_PAGE = 12;
    //titleDate
    const [titleDate, setTitleDate] = useState("")
    
    //pagination functions
    useEffect(()=>{
        dateSelector()
    }, [])
    useEffect(()=>{
        const total = Math.ceil(usersResult.length / USERS_PER_PAGE)
        setTotalPages(total)
        setCurrentPage(1) 
    }, [usersResult])
    const handleChangePages = (event, value)=>{
        setCurrentPage(value)
        const totalUsers = usersResult.length
        value = value - 1
        const firstIndex = value * USERS_PER_PAGE
        if(firstIndex > totalUsers) return 
        const usersResultCopy = [...usersResult]
        setUsersMatch(usersResultCopy.splice(firstIndex, USERS_PER_PAGE))
    }
    const handleUsersResult = (result)=>{
        if(!result.length){
            setUsersResult([])
            setUsersMatch([])    
            setCurrentPage(0)
            return
        }
        setUsersResult(result)
        setUsersMatch([...result].splice(0, USERS_PER_PAGE))
        setCurrentPage(0)
    }


    //UPDATE LOCAL LIST
    //refresh local lists usersListCopy, usersFiltered and usersMatch on delete.
    const handleRefreshDelete =(id)=>{
        let updatedUsersClonedDelete = usersListCopy.filter(user => user.id !== id)
        setUsersListCopy(updatedUsersClonedDelete)
       let updatedUsersMatchDelete  = usersMatch.filter(user => user.id !== id)
       setUsersMatch(updatedUsersMatchDelete)
    }
    //UPDATE DATE TITLE
    const dateSelector =()=>{
        const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
        let today = new Date()
        let todayFormat = format(today, "MM/dd/yyyy")
        let todayDay = new Date(todayFormat).getDay()
        let todayDate = new Date(todayFormat).getDate().toString()
        let todayMonth = new Date(todayFormat).getMonth();
        let fechaHoy =  `Hoy, ${dias[todayDay]} ${todayDate} de ${meses[todayMonth]} `
        setTitleDate(fechaHoy)
    }


    return (
        <>
            <div className='flex-container-calendar'>
                {/* <div className='button-excel-container'>
                    <ExportExcel excelData={usersList} fileName={"Excel export"} />
                </div>*/}
                {/* <JSONsaver usersList={usersList}/> */}
                {
                    !mobile ? 
                    (<>
                                    <div className="pendientes-title">
                    <p>Pendientes</p>
                    <p>{titleDate}</p>
                </div>
                <div className="searchBox-container">
                    <div className="searchBar-container">
                        <SearchBar usersListCopy={usersListCopy}  handleUsersResult={handleUsersResult} setResetFilters={setResetFilters}/>               
                    </div>
                    <div className='filters-container'>
                        <Filters handleUsersResult={handleUsersResult} settings={settings} usersListCopy={usersListCopy} resetFilters={resetFilters} setResetFilters={setResetFilters} usersMatch={usersMatch}/>
                    </div>
                    <div className="viewAll-btn-container">
                        <BtnViewAll handleUsersResult={handleUsersResult} usersListCopy={usersListCopy} setResetFilters={setResetFilters}/>
                    </div>
                </div>
  
                  <UsersMatch usersMatch={usersMatch} settings={settings} handleRefreshDelete={handleRefreshDelete} usersPerPage={USERS_PER_PAGE} />            


                <div className='pagination-container'>
                    <Stack spacing={2}>
                         <Pagination count={totalPages} color="primary" page={currentPage} onChange={handleChangePages} defaultPage={1} />
                    </Stack>               
                </div>
                    </>):
                    (<>
                    <div className="pendientes-title">
                    <p>Pendientes</p>
                    <p>{titleDate}</p>
                </div>
                <div className="searchBox-container">
                    <div className="searchBar-container">
                        <SearchBar usersListCopy={usersListCopy}  handleUsersResult={handleUsersResult} setResetFilters={setResetFilters}/>               
                    </div>
                    <div className='filters-container'>
                                <Filters handleUsersResult={handleUsersResult} settings={settings} usersListCopy={usersListCopy} resetFilters={resetFilters} setResetFilters={setResetFilters} />
                                <BtnViewAll handleUsersResult={handleUsersResult} usersListCopy={usersListCopy} setResetFilters={setResetFilters}/>
                    </div>
                </div>
  
                  <UsersMatch usersMatch={usersMatch} settings={settings} handleRefreshDelete={handleRefreshDelete} usersPerPage={USERS_PER_PAGE} />            


                <div className='pagination-container'>
                    <Stack spacing={2}>
                         <Pagination count={totalPages} color="primary" page={currentPage} onChange={handleChangePages} defaultPage={1} />
                    </Stack>               
                </div>
                    </>)
                }
                

            </div>
        </>


    )

}
