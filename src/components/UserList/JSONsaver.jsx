import React from 'react';
import { saveAs } from 'file-saver';

const JSONsaver = ({ usersList }) => {
  const handleGuardarJSON = () => {
    const jsonData = JSON.stringify(usersList, null, 2); // Convierte el array a JSON con formato legible (indentado con 2 espacios)
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'contactos.json');
  };

  return (
    <div>
      {/* Aquí va tu lista de contactos */}
      <button onClick={handleGuardarJSON}>Guardar en JSON</button>
    </div>
  );
};

export default JSONsaver;