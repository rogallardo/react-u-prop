import React from 'react'
import { useState, useEffect } from 'react'
import './searchBar.css'

export default function SearchBar( { usersListCopy, handleUsersResult, setResetFilters }) {
    //input value user
    const [filteredSuggestions, setFilteredSuggestions] = useState([...usersListCopy]);
    const [inputValue, setInputValue] = useState('');     
    //input text and datalist functions
    const handleInputChange = (e) => {
      const value = e.target.value
      setInputValue(value);
      if(!value){
        setFilteredSuggestions([])
        return setInputValue(value);
      }  
      const filteredByName = [...usersListCopy].filter((suggestion) => suggestion.googleName.toLowerCase().includes(value.toLowerCase()));
      console.log(filteredByName)
      if(filteredByName.length){
          const maxResults = filteredByName.slice(0,8)
          return setFilteredSuggestions(maxResults);
      }
      const filteredByPhone = usersListCopy.filter((suggestion) => suggestion.phone.includes(value))
      if(filteredByPhone.length){            
          const maxResults = filteredByPhone.slice(0,8)
          return setFilteredSuggestions(maxResults)
      } 
      if(!filteredByName.length && !filteredByPhone.length)  {
            return setFilteredSuggestions([])
      }   
    };
    const handleSuggestionClick = (suggestion) => {
      setInputValue(suggestion.googleName);
      setFilteredSuggestions([]);
      setResetFilters(true)
      handleUsersResult([suggestion])
    };
  return (
    <>
          <div className="inputSearch-container">
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Buscar por nombre o teléfono"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </div>
            {filteredSuggestions.length > 0 && inputValue.length > 0 &&
                (
                <div className="datalist-container">
                    <ul>
                        {filteredSuggestions.map((suggestion, index) => (
                           <div key={index}>
                                <li onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.googleName}
                            </li>
                           </div> ))          
                        }
                    </ul>
                </div>               
                )  
            }
          </div>    
    </>   
  )
}
