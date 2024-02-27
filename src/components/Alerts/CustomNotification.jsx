import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CustomNotification = ({ type, message }) => {
  MySwal.fire({
    icon: type,
    title: message,
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000, // Duración en milisegundos
  });
};

export default CustomNotification;




