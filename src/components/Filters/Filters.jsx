import React from 'react'
import './filters.css'
import { compareAsc, parseISO, format, compareDesc, parse } from "date-fns";
import { Modal, Button, Select, MenuItem } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterListIcon from '@mui/icons-material/FilterList';
export default function Filters({ handleUsersResult, settings, usersListCopy, resetFilters, setResetFilters, usersMatch }) {
    const mobile = useMediaQuery('(max-width: 700px)')
    const estados = ['Sin contactar', 'Contactado', 'Re-contactado', 'Propuesta', 'Visita', 'Captado', 'Rechazado']
    //all cities and states
    const [cities, setCities] = useState(settings.cities.sort())
    const [statusUsers, setStatusUsers] = useState(estados)
    const [sortBy, setSortBy] = useState(['Recientes', 'Nombre'])
    //filtering list results
    const [filteredUsersList, setFilteredUsersList] = useState([...usersListCopy]);
    const [filteredAndSortList, setFilteredAndSortList] = useState([...usersListCopy])
    //city and status filter
    const [lastCityFilter, setLastCityFilter] = useState('');
    const [lastStatusFilter, setLastStatusFilter] = useState('');
    //sort by
    const [lastSortBy, setLastSortBy] = useState('')
    //handler windows/select/modal openclose
    const [openFiltersMenu, setOpenFiltersMenu] = useState(false)
    const [openCityFilter, setOpenCityFilter] = useState(false)
    const [openStatusFilter, setOpenStatusFilter] = useState(false)
    const [openSortByFilter, setOpenSortByFilter] = useState(false)
    const [filters, setFilters] = useState({
        city: "",
        status: "",
        sort: ""
    })
    const [selectedCity, setSelectedCity] = useState('Todas las ciudades');
    const [selectedStatus, setSelectedStatus] = useState('Todos los estados');
    const [selectedSortBy, setSelectedSortBy] = useState('Sin ordenar');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(()=>{
        handleFilter([...usersListCopy])
    }, [filters])
    //reset filters
    useEffect(()=>{
        if(resetFilters){
            setLastCityFilter('') 
            setLastStatusFilter('')
            setLastSortBy('')
        }
    }, [resetFilters])
    // handler set filtering npmresults
    useEffect(() => {
        if(filteredUsersList){
            const filtersListCopy = [...filteredUsersList]
            setResetFilters(false)
            handleUsersResult([...filtersListCopy]) 
        }
    }, [filteredUsersList])
    //filteres and sort
    // useEffect(() => {
    //     if(filteredAndSortList){
    //         const filtersListCopy = [...filteredAndSortList]
    //         setResetFilters(false)
    //         handleUsersResult([...filtersListCopy]) 
    //     }
    // }, [filteredAndSortList])
    //handler close filters menu 
    const modalRef = useRef(null);  
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
            setOpenFiltersMenu(false);
            setOpenCityFilter(false);
            setOpenStatusFilter(false)
            }
        };
    
        if (openFiltersMenu) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [openFiltersMenu])
    //
    const handleOpenCityFilter = ()=>{
        setOpenCityFilter(!openCityFilter)
    }
    const handleOpenStatusFilter = ()=>{
        setOpenStatusFilter(!openStatusFilter)
    }
    const handleOpenSortByFilter = ()=>{
        setOpenSortByFilter(!openSortByFilter)
    }
    
    //filter btn
   const handleOpenDropdown = ()=>{
    setOpenFiltersMenu(!openFiltersMenu)
   }
    //filters functions 
    const handleCityFilter = (value) => {
        setFilters({
            ...filters,
            city: value
        })
        setLastCityFilter(value);
        setOpenSortByFilter(false)
        setOpenCityFilter(false)
        setOpenStatusFilter(false)
        setOpenFiltersMenu(false)      
    };   
    const handleStatusFilter = (value) => {
        setFilters({
            ...filters,
            status: value
        })
        setLastStatusFilter(value);
        setOpenFiltersMenu(false)
        setOpenCityFilter(false)
        setOpenStatusFilter(false)
        setOpenSortByFilter(false)
              
    };
    const handleSortFilter = (value) => {
        setFilters({
            ...filters,
            sort: value
        })
            setLastSortBy(value)
            setOpenFiltersMenu(false)
            setOpenCityFilter(false)
            setOpenStatusFilter(false)
            setOpenSortByFilter(false)

    }
    const handleResetCityFilter = () => {
        setLastCityFilter('')  
        handleCityFilter('')
    }
    const handleResetStatusFilter = () =>{
        setLastStatusFilter('')
        handleStatusFilter('')
    }
    const handleResetOrderByFilter = () => {
        setLastSortBy('')
        handleSortFilter('')
    }
    // lo nuevo aqui
    const handleFilter =(array)=>{
      let newArray = array.filter(user => {
            return (
                (filters.city === '' || user.city === filters.city) &&
                (filters.status === '' || user.status === filters.status )
            )
        })
        if(filters.sort === 'Nombre'){
            let orderList = [...newArray].sort((a, b) => a.name.localeCompare(b.name));
            return setFilteredUsersList(orderList)
        }
        if(filters.sort === 'Recientes'){
            let arrayUsersSinFecha = []
            const arrayMapped = newArray.map(user =>{
                if(user.lastContactDate === '-'){
                    return arrayUsersSinFecha.push(user)
                  
                }
                return user
            })
            const compareDates = (a, b) => compareDesc((new Date (a.lastContactDate)), (new Date(b.lastContactDate)));
            let orderList = [...arrayMapped].sort(compareDates);
            let finalArray = [...orderList, ...arrayUsersSinFecha]
            return setFilteredUsersList(finalArray)
        }
        setFilteredUsersList(newArray)
    }

    //mobile
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        if(event.target.value === "Todas las ciudades"){
            handleResetCityFilter()
        }
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        if(event.target.value === "Todas los estados"){
            handleResetStatusFilter()
        }
    };

    const handleSortByChange = (event) => {
        setSelectedSortBy(event.target.value);
        if(event.target.value === "Sin ordenar"){
            handleResetOrderByFilter()
        }
    };

  return (
    <>
    {!mobile? 
    (<>
     <div ref={modalRef} className="filters-btn-menu-container" >
        <div className="filters-btn-filters-applied-container ">
            <div  className="filters-btn" onClick={handleOpenDropdown}>
                <p>Filtros</p>
            </div>
            {
                lastCityFilter &&
                <div  className="filtersCity-applied-container" onClick={handleResetCityFilter}><p>{lastCityFilter}</p></div>
            }
            {
                lastStatusFilter &&
                <div className="filtersStatus-applied-container" onClick={handleResetStatusFilter}><p>{lastStatusFilter}</p></div>
            }
                        {
                lastSortBy &&
                <div className="filtersStatus-applied-container" onClick={handleResetOrderByFilter}><p>{lastSortBy}</p></div>
            }
            
        </div>    
            {openFiltersMenu  &&
            (

            <div  className="filters-menu" >
                <div className="filter-btn-dropdown-container">
                    <div  className="filter-btn" onClick={handleOpenCityFilter}>
                            <p>Ciudad</p>
                            <i className='arrow-icon'></i>      
                    </div>
                    {openCityFilter && 
                        <div  className="datalist-filter-container">
                            <ul>
                                {
                                    cities.map((city, i)=>{
                                        return  <li onClick={()=>handleCityFilter(city)} key={i} >{city}</li>
                                    })
                                } 
                            </ul>  
                        </div>}
                </div>
                <div  className="filter-btn-dropdown-container">
                    <div className="filter-btn" onClick={handleOpenStatusFilter}>
                        <p>Estado</p>
                        <i className='arrow-icon'></i>      
                    </div>
                    {openStatusFilter && 
                        <div className="datalist-filter-container">
                            <ul>
                                {
                                    statusUsers.map((status, i)=>{
                                        return  <li onClick={()=>handleStatusFilter(status)} key={i} >{status}</li>
                                    })
                                } 
                            </ul>  
                        </div>}
                </div>
                <div  className="filter-btn-dropdown-container">
                    <div className="filter-btn" onClick={handleOpenSortByFilter}>
                        <p>Ordenar por</p>
                        <i className='arrow-icon'></i>      
                    </div>
                    {openSortByFilter && 
                        <div className="datalist-filter-container">
                            <ul>
                                {
                                    sortBy.map((sort, i)=>{
                                        return  <li onClick={()=>handleSortFilter(sort)} key={i} >{sort}</li>
                                    })
                                } 
                            </ul>  
                        </div>}
                </div>           
            </div>  
            )   
            }        
    </div> 
    </>)
    :   
    (<>
     <div ref={modalRef} className="filters-btn-menu-container" >
        <div className="filters-btn-filters-applied-container ">
                <div  className="filters-btn" onClick={handleOpenModal} style={{display: 'flex', width: '50px', minWidth: '1rem', marginRight: '20px'}}>
                <FilterListIcon style={{color: '#6F5CC4'}} />
            </div>
            
        </div>           
    </div> 
    <Modal open={isModalOpen} onClose={handleCloseModal} >
                <div className='modalFiltros-container' 
                style={{position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        boxShadow: 24,
                        padding: '1rem 1rem'
                        
                        }} >
                    
        
                    <h2>Filtros</h2>
\                 
                <Select value={selectedCity} onChange={handleCityChange} fullWidth style={{marginBottom:'1rem'}}>
                        <MenuItem value="Todas las ciudades" >Todas las ciudades</MenuItem>
                        {cities.map((city, index) => (
                            <MenuItem value={city} key={index} onClick={()=>handleCityFilter(city)}  >{city}</MenuItem>
                        ))}
                    </Select>
                    <Select value={selectedStatus} onChange={handleStatusChange} fullWidth style={{marginBottom:'1rem'}}>
                        <MenuItem value="Todos los estados" onClick={handleResetStatusFilter}>Todos los estados</MenuItem>
                        {statusUsers.map((status, index) => (
                            <MenuItem value={status} key={index} onClick={()=>handleStatusFilter(status)} >{status}</MenuItem>
                        ))}
                    </Select>
                    <Select value={selectedSortBy} onChange={handleSortByChange} fullWidth style={{marginBottom:'1rem'}}>
                        <MenuItem value="Sin ordenar" onClick={handleResetOrderByFilter}>Sin ordenar</MenuItem>
                        {sortBy.map((sort, index) => (
                            <MenuItem value={sort} key={index} onClick={()=>handleSortFilter(sort)} >{sort}</MenuItem>
                        ))}
                    </Select>
                    <Button onClick={handleCloseModal} style={{marginLeft: '70%'}}>Cerrar</Button>
                </div>
            </Modal>
    </>)}     
</>  
)
}
