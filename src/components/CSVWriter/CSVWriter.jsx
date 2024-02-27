import React from 'react';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import './csvwriter.scss'
import Tooltip from '@mui/material/Tooltip';

export default function CSVWriter({ usersList }) {
  
const iconStyle = {
  display: 'flex',
  textDecoration: 'none', // Elimina el subrayado del enlace
  color: 'inherit', // Usa el color del texto heredado
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'

};

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Phone', key: 'phone' },
    { label: 'Location', key: 'city' },
    { label: 'Notes', key: 'link' },

  ];

  const data = usersList
  .filter(user=> user.status === 'Sin contactar')
  .map(user => {
      return { name: user.googleName,  phone: user.phone, link: user.link, city: user.city}
  })

  // const data = [
  //   { name: 'Juan',  phone: '1173660014', link: 'https://www.npmjs.com/package/react-csv', city: 'Devoto'},
  //   { name: 'María', phone: '1173660015', link: 'https://www.npmjs.com/package/react-csv', city: 'Devoto'},
  //   { name: 'Pedro', phone: '1173660016', link: 'https://www.npmjs.com/package/react-csv', city: 'Devoto'}
  // ];

  return (
    <Tooltip title='Descargar CSV'>
       <div className='btn-csvwriter'>
      <CSVLink data={data} headers={headers} filename={"contactos.csv"} style={iconStyle}>
        <DownloadIcon style={{color: 'white'}} />
       
      </CSVLink>
    </div>
    </Tooltip>
   
  );
}

