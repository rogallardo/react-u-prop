import React from 'react'
import {  useState, useEffect } from 'react'
import './UserList.scss'
import User from '../User/User'
import '@fontsource/roboto/300.css';
import SearchBar from '../SearchBar/SearchBar'
import Filters from '../Filters/Filters'
import JSONsaver from './JSONsaver';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import UsersMatch from '../UsersMatch/UsersMatch'
import BtnViewAll from '../Btn-ViewAll/BtnViewAll';
import CSVWriter from '../CSVWriter/CSVWriter';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function UserList({ usersList, settings }) {
    const mobile = useMediaQuery('(max-width: 700px)')
    //list cloned from usersList (usersListCopy)
    // result list from filters and search bar
    //render list (usersMatch)
    const [usersListCopy, setUsersListCopy] = useState([...usersList])
    const [usersResult, setUsersResult] = useState([])
    const [usersMatch, setUsersMatch] = useState([])
    const [resetFilters, setResetFilters] = useState(false)
    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const USERS_PER_PAGE = 12;
    //pagination functions
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
    //refresh local lists usersListCopy and usersFiltered on status change.

    return (
        <>
            <div className='flex-container-userList'>
                {/* <div className='button-excel-container'>
                    <ExportExcel excelData={usersList} fileName={"Excel export"} />
                </div>*/}
                {/* <JSONsaver usersList={usersList}/> */}
                {
              
                    !mobile ? 
                    (<>
                    <div className="searchBox-container">
                            <div className="searchBar-container">
                                <SearchBar usersListCopy={usersListCopy}  handleUsersResult={handleUsersResult} setResetFilters={setResetFilters} />               
                            </div>
                            <div className='filters-container'>
                                <Filters handleUsersResult={handleUsersResult} settings={settings} usersListCopy={usersListCopy} resetFilters={resetFilters} setResetFilters={setResetFilters} />
                            </div>
                            <div className="viewAll-btn-container">
                                <BtnViewAll handleUsersResult={handleUsersResult} usersListCopy={usersListCopy} setResetFilters={setResetFilters}/>
                                <CSVWriter usersList={usersListCopy}/>
                            </div>
                            {/* <div className="viewAll-btn-container">
                            <CSVWriter />
                            </div> */}
                        </div>
                     </>):
                    (<>
                         <div className="searchBox-container-mobile">
                            <div className="searchBar-container">
                                <SearchBar usersListCopy={usersListCopy}  handleUsersResult={handleUsersResult} setResetFilters={setResetFilters} />               
                            </div>
                            <div className='filters-container'>
                                <Filters handleUsersResult={handleUsersResult} settings={settings} usersListCopy={usersListCopy} resetFilters={resetFilters} setResetFilters={setResetFilters} />
                                <BtnViewAll handleUsersResult={handleUsersResult} usersListCopy={usersListCopy} setResetFilters={setResetFilters}/>
                            </div>
                            {/* <div className="viewAll-btn-container">
                            <CSVWriter />
                            </div> */}
                        </div>

                    </>)
                }
                
                <div className="usersMatchList-container">
                  <UsersMatch usersMatch={usersMatch} settings={settings} handleRefreshDelete={handleRefreshDelete} usersPerPage={USERS_PER_PAGE} />  
                </div>
                {
              
                     !mobile ? 
                     (<>
                    <div className='pagination-container-usersList'>
                        <div></div>
                        <Stack spacing={2}>
                            <Pagination count={totalPages} color="primary" page={currentPage} onChange={handleChangePages} defaultPage={1} />
                        </Stack>   
                            <p style={{display:'flex', width: '70px', fontSize: '0.9rem'}}>Total: {usersResult.length}</p>             
                    </div>
                     </>):
                     (<>
                     <div className='pagination-container-usersList-mobile'>
                        {/* <div></div> */}
                        <Stack spacing={2}>
                            <Pagination count={totalPages} color="primary" page={currentPage} onChange={handleChangePages} defaultPage={1} />
                        </Stack>   
                            <p style={{display:'flex', width: '70px', fontSize: '0.7rem'}}>Total: {usersResult.length}</p>             
                    </div>
                     </>)
               
                   
                }          
               
            </div>
        </>


    )

}
