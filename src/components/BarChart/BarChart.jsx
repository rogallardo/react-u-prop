import React from 'react'
import { useMemo, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  
  

  export default function BarChart({ totalContactadosN, totalReContactadosN, totalPropuestaN, totalVisitaN, totalCaptadoN, totalRechazadosN, usersFilteredN}) {
    const [scoreCont, setScoreCont] = useState()
    const [scoreReCont, setScoreReCont] = useState() 
    const [scoreProp, setScoreProp] = useState()
    const [scoreVis, setScoreVis] = useState() 
    const [scoreCap, setScoreCap] = useState()
    const [scoreRech, setScoreRech] = useState() 

    const options = {
        responsive: true,
        scales: {
            y: {
                min:0,
                max: usersFilteredN,
            },
        },
        fill: true,
    
    }
    ///igualar funciones a variables y despues pasarlas a scores
    const scores = [totalContactadosN, totalReContactadosN, totalPropuestaN, totalVisitaN, totalCaptadoN, totalRechazadosN, ]
  const labels = ["Contactados", "Recontactados", "Propuestas", "Visitas", "Captados", "Rechazados"]
    const data = {
        
            datasets: [
                {
                    label: "Mis datos",
                    data: scores,
                    borderColor: "rgb(75, 192, 192)"
                }
            ],
            labels
    }
      
    
    
    return <Bar data={data} options={options} />
}
