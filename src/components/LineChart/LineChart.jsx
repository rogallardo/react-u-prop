import React from 'react'
import {  useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    PointElement,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
    
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    PointElement,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  
  

  export default function LineChart({ 
    filterEneroContactado,
    filterEneroReContactado,
    filterEneroPropuesta,
    filterEneroVisita,
    filterEneroCaptado,
    filterEneroRechazado,

    filterFebreroContactado,
    filterFebreroReContactado,
    filterFebreroPropuesta,
    filterFebreroVisita,
    filterFebreroCaptado,
    filterFebreroRechazado,

    filterMarzoContactado,
    filterMarzoReContactado,
    filterMarzoPropuesta,
    filterMarzoVisita,
    filterMarzoCaptado,
    filterMarzoRechazado,

    filterAbrilContactado,
    filterAbrilReContactado,
    filterAbrilPropuesta,
    filterAbrilVisita,
    filterAbrilCaptado,
    filterAbrilRechazado,

    filterMayoContactado,
    filterMayoReContactado,
    filterMayoPropuesta,
    filterMayoVisita,
    filterMayoCaptado,
    filterMayoRechazado,

    filterJunioContactado,
    filterJunioReContactado,
    filterJunioPropuesta,
    filterJunioVisita,
    filterJunioCaptado,
    filterJunioRechazado,

    filterJulioContactado,
    filterJulioReContactado,
    filterJulioPropuesta,
    filterJulioVisita,
    filterJulioCaptado,
    filterJulioRechazado,

    filterAgostoContactado,
    filterAgostoReContactado,
    filterAgostoPropuesta,
    filterAgostoVisita,
    filterAgostoCaptado,
    filterAgostoRechazado,

    filterSeptiembreContactado,
    filterSeptiembreReContactado,
    filterSeptiembrePropuesta,
    filterSeptiembreVisita,
    filterSeptiembreCaptado,
    filterSeptiembreRechazado,

    filterOctubreContactado,
    filterOctubreReContactado,
    filterOctubrePropuesta,
    filterOctubreVisita,
    filterOctubreCaptado,
    filterOctubreRechazado,

    filterNoviembreContactado,
    filterNoviembreReContactado,
    filterNoviembrePropuesta,
    filterNoviembreVisita,
    filterNoviembreCaptado,
    filterNoviembreRechazado,

    filterDiciembreContactado,
    filterDiciembreReContactado,
    filterDiciembrePropuesta,
    filterDiciembreVisita,
    filterDiciembreCaptado,
    filterDiciembreRechazado}) {

    
    const options = {
        responsive: true,
        scales: {
            y: {
                min:0,
              
            },
        },
        fill: true,
    
    }
    ///igualar funciones a variables para poder utilizar los valores en el array del grafico 
    let filterEneroContactad = filterEneroContactado()
    let filterFebreroContactad = filterFebreroContactado()
    let filterMarzoContactad = filterMarzoContactado()
    let filterAbrilContactad = filterAbrilContactado()
    let filterMayoContactad = filterMayoContactado()
    let filterJunioContactad = filterJunioContactado()
    let filterJulioContactad = filterJulioContactado()
    let filterAgostoContactad = filterAgostoContactado()
    let filterSeptiembreContactad = filterSeptiembreContactado()
    let filterOctubreContactad = filterOctubreContactado()
    let filterNoviembreContactad = filterNoviembreContactado()
    let filterDiciembreContactad = filterDiciembreContactado()
    //array que sera pasado como argumento al grafico
    const contactado = [  
      filterEneroContactad,
      filterFebreroContactad,
      filterMarzoContactad,
      filterAbrilContactad,
      filterMayoContactad,
      filterJunioContactad,
      filterJulioContactad,
      filterAgostoContactad,
      filterSeptiembreContactad,
      filterOctubreContactad,
      filterNoviembreContactad,
      filterDiciembreContactad,
     ]
     ///igualar funciones a variables para poder utilizar los valores en el array del grafico 
    let filterEneroReContactad = filterEneroReContactado()
    let filterFebreroReContactad = filterFebreroReContactado()
    let filterMarzoReContactad = filterMarzoReContactado()
    let filterAbrilReContactad = filterAbrilReContactado()
    let filterMayoReContactad = filterMayoReContactado()
    let filterJunioReContactad = filterJunioReContactado()
    let filterJulioReContactad = filterJulioReContactado()
    let filterAgostoReContactad = filterAgostoReContactado()
    let filterSeptiembreReContactad = filterSeptiembreReContactado()
    let filterOctubreReContactad = filterOctubreReContactado()
    let filterNoviembreReContactad = filterNoviembreReContactado()
    let filterDiciembreReContactad = filterDiciembreReContactado()
    //array que sera pasado como argumento al grafico
    const recontactado = [  
      filterEneroReContactad,
      filterFebreroReContactad,
      filterMarzoReContactad,
      filterAbrilReContactad,
      filterMayoReContactad,
      filterJunioReContactad,
      filterJulioReContactad,
      filterAgostoReContactad,
      filterSeptiembreReContactad,
      filterOctubreReContactad,
      filterNoviembreReContactad,
      filterDiciembreReContactad,
     ]
      ///igualar funciones a variables para poder utilizar los valores en el array del grafico 
    let filterEneroProp = filterEneroPropuesta()
    let filterFebreroProp = filterFebreroPropuesta()
    let filterMarzoProp = filterMarzoPropuesta()
    let filterAbrilProp = filterAbrilPropuesta()
    let filterMayoProp = filterMayoPropuesta()
    let filterJunioProp = filterJunioPropuesta()
    let filterJulioProp = filterJulioPropuesta()
    let filterAgostoProp = filterAgostoPropuesta()
    let filterSeptiembreProp = filterSeptiembrePropuesta()
    let filterOctubreProp = filterOctubrePropuesta()
    let filterNoviembreProp = filterNoviembrePropuesta()
    let filterDiciembreProp = filterDiciembrePropuesta()
    //array que sera pasado como argumento al grafico
    const propuesta = [  
      filterEneroProp,
      filterFebreroProp,
      filterMarzoProp,
      filterAbrilProp,
      filterMayoProp,
      filterJunioProp,
      filterJulioProp,
      filterAgostoProp,
      filterSeptiembreProp,
      filterOctubreProp,
      filterNoviembreProp,
      filterDiciembreProp,
     ]
     ///igualar funciones a variables para poder utilizar los valores en el array del grafico 
    let filterEneroVis = filterEneroVisita()
    let filterFebreroVis = filterFebreroVisita()
    let filterMarzoVis = filterMarzoVisita()
    let filterAbrilVis = filterAbrilVisita()
    let filterMayoVis = filterMayoVisita()
    let filterJunioVis = filterJunioVisita()
    let filterJulioVis = filterJulioVisita()
    let filterAgostoVis = filterAgostoVisita()
    let filterSeptiembreVis = filterSeptiembreVisita()
    let filterOctubreVis = filterOctubreVisita()
    let filterNoviembreVis = filterNoviembreVisita()
    let filterDiciembreVis = filterDiciembreVisita()
    //array que sera pasado como argumento al grafico
    const visita = [  
      filterEneroVis,
      filterFebreroVis,
      filterMarzoVis,
      filterAbrilVis,
      filterMayoVis,
      filterJunioVis,
      filterJulioVis,
      filterAgostoVis,
      filterSeptiembreVis,
      filterOctubreVis,
      filterNoviembreVis,
      filterDiciembreVis,
     ]
          ///igualar funciones a variables para poder utilizar los valores en el array del grafico 
    let filterEneroCap = filterEneroCaptado()
    let filterFebreroCap = filterFebreroCaptado()
    let filterMarzoCap = filterMarzoCaptado()
    let filterAbrilCap = filterAbrilCaptado()
    let filterMayoCap = filterMayoCaptado()
    let filterJunioCap = filterJunioCaptado()
    let filterJulioCap = filterJulioCaptado()
    let filterAgostoCap = filterAgostoCaptado()
    let filterSeptiembreCap = filterSeptiembreCaptado()
    let filterOctubreCap = filterOctubreCaptado()
    let filterNoviembreCap = filterNoviembreCaptado()
    let filterDiciembreCap = filterDiciembreCaptado()
    //array que sera pasado como argumento al grafico
    const captado = [  
      filterEneroCap,
      filterFebreroCap,
      filterMarzoCap,
      filterAbrilCap,
      filterMayoCap,
      filterJunioCap,
      filterJulioCap,
      filterAgostoCap,
      filterSeptiembreCap,
      filterOctubreCap,
      filterNoviembreCap,
      filterDiciembreCap,
     ]

  ///igualar funciones a variables para poder utilizar los valores en el array del grafico 
    let filterEneroRec = filterEneroRechazado()
    let filterFebreroRec = filterFebreroRechazado()
    let filterMarzoRec = filterMarzoRechazado()
    let filterAbrilRec = filterAbrilRechazado()
    let filterMayoRec = filterMayoRechazado()
    let filterJunioRec = filterJunioRechazado()
    let filterJulioRec = filterJulioRechazado()
    let filterAgostoRec = filterAgostoRechazado()
    let filterSeptiembreRec = filterSeptiembreRechazado()
    let filterOctubreRec = filterOctubreRechazado()
    let filterNoviembreRec = filterNoviembreRechazado()
    let filterDiciembreRec = filterDiciembreRechazado()
    //array que sera pasado como argumento al grafico
    const rechazado = [  
      filterEneroRec,
      filterFebreroRec,
      filterMarzoRec,
      filterAbrilRec,
      filterMayoRec,
      filterJunioRec,
      filterJulioRec,
      filterAgostoRec,
      filterSeptiembreRec,
      filterOctubreRec,
      filterNoviembreRec,
      filterDiciembreRec,
     ]
  const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const data = {
        
            datasets: [
                {
                    label: "Contactados",
                    data: contactado,
                    borderColor: "#ffeb3b",
                    tension: 0.3,
                    backgroundColor: "#ffeb3b37",
                },
                {
                  label: "Re-contactados",
                  data: recontactado,
                  borderColor: "#ffc107",
                  tension: 0.3,
                  backgroundColor: "#ffc10730",
              },
              {
                label: "Propuestas",
                data: propuesta,
                borderColor: "#ff9800",
                tension: 0.3,
                backgroundColor: "#ff990028",
              },
              {
                label: "Visitas",
                data: visita,
                borderColor: "#4dabf5",
                tension: 0.3,
                backgroundColor: "#4dacf52a",
              },
              {
                label: "Captados",
                data: captado,
                borderColor: "#4caf50",
                tension: 0.3,
                backgroundColor: "#4caf4f2c",
              },
              {
                label: "Rechazados",
                data: rechazado,
                borderColor: "#ef5350",
                tension: 0.3,
                backgroundColor: "#ef535034",
              },
            ],
            labels
    }
    
    
    
    return <Line data={data} options={options} />
}
