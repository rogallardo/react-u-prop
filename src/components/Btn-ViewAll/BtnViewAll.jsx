import React from 'react'
import './btnViewAll.scss'

function BtnViewAll({ handleUsersResult, usersListCopy, setResetFilters }) {
  const handleViewAll = ()=>{
    handleUsersResult([...usersListCopy])
    setResetFilters(true)
    // console.log('hola')
  }
  return (
    <div onClick={handleViewAll} className="viewAll-btn" >
        <p>Ver todo</p>
    </div>
  )
}

export default BtnViewAll