import React from 'react'
import { useState, useEffect } from 'react'
import './statistics.css'
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import { format, addDays, subDays } from 'date-fns/esm';
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import BarChart from '../BarChart/BarChart'
import LineChart from '../LineChart/LineChart'
import BarChart2 from '../BarChart2/BarChart2';
import '@fontsource/roboto/300.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


export default function Statistics({ usersList, settings }) {
    const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
    const [copyUsersList, setCopyUsersList] = useState(usersList)
    const [usersFiltered, setUsersFiltered] = useState([])

    const [totalContactados, setTotalContactados] = useState([])
    const [totalRechazados, setTotalRechazados] = useState([])
    const [totalReContactados, setTotalReContactados] = useState([])
    const [totalPropuesta, setTotalPropuesta] = useState([])
    const [totalVisita, setTotalVisita] = useState([])
    const [totalCaptado, setTotalCaptado] = useState([])


    const [usersFilteredN, setUsersFilteredN] = useState(0)

    const [totalContactadosN, setTotalContactadosN] = useState(0)
    const [totalRechazadosN, setTotalRechazadosN] = useState(0)
    const [totalReContactadosN, setTotalReContactadosN] = useState(0)
    const [totalPropuestaN, setTotalPropuestaN] = useState(0)
    const [totalVisitaN, setTotalVisitaN] = useState(0)
    const [totalCaptadoN, setTotalCaptadoN] = useState(0)

    const [totalCities, setTotalCities] = useState([])
    const actualYearForInput = new Date().getFullYear()
    const [yearSelect, setYearSelect] = useState(actualYearForInput)

    useEffect(() => {
        lastWeek()
        usersCities()

    }, [])

    useEffect(() => {
        filterEneroContactado()
        filterEneroReContactado()
        filterEneroPropuesta()
        filterEneroVisita()
        filterEneroCaptado()
        filterEneroRechazado()

        filterFebreroContactado()
        filterFebreroReContactado()
        filterFebreroPropuesta()
        filterFebreroVisita()
        filterFebreroCaptado()
        filterFebreroRechazado()

        filterMarzoContactado()
        filterMarzoReContactado()
        filterMarzoPropuesta()
        filterMarzoVisita()
        filterMarzoCaptado()
        filterMarzoRechazado()

        filterAbrilContactado()
        filterAbrilReContactado()
        filterAbrilPropuesta()
        filterAbrilVisita()
        filterAbrilCaptado()
        filterAbrilRechazado()

        filterMayoContactado()
        filterMayoReContactado()
        filterMayoPropuesta()
        filterMayoVisita()
        filterMayoCaptado()
        filterMayoRechazado()

        filterJunioContactado()
        filterJunioReContactado()
        filterJunioPropuesta()
        filterJunioVisita()
        filterJunioCaptado()
        filterJunioRechazado()

        filterJulioContactado()
        filterJulioReContactado()
        filterJulioPropuesta()
        filterJulioVisita()
        filterJulioCaptado()
        filterJulioRechazado()

        filterAgostoContactado()
        filterAgostoReContactado()
        filterAgostoPropuesta()
        filterAgostoVisita()
        filterAgostoCaptado()
        filterAgostoRechazado()

        filterSeptiembreContactado()
        filterSeptiembreReContactado()
        filterSeptiembrePropuesta()
        filterSeptiembreVisita()
        filterSeptiembreCaptado()
        filterSeptiembreRechazado()

        filterOctubreContactado()
        filterOctubreReContactado()
        filterOctubrePropuesta()
        filterOctubreVisita()
        filterOctubreCaptado()
        filterOctubreRechazado()

        filterNoviembreContactado()
        filterNoviembreReContactado()
        filterNoviembrePropuesta()
        filterNoviembreVisita()
        filterNoviembreCaptado()
        filterNoviembreRechazado()

        filterDiciembreContactado()
        filterDiciembreReContactado()
        filterDiciembrePropuesta()
        filterDiciembreVisita()
        filterDiciembreCaptado()
        filterDiciembreRechazado()
    }, [yearSelect])

    useEffect(() => {
        usersStatus()
        reducerTotal()
    }, [usersFiltered])

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        reducerC()

    }, [totalContactados])

    useEffect(() => {
        reducerRC()
    }, [totalReContactados])

    useEffect(() => {
        reducerR()
    }, [totalRechazados])

    useEffect(() => {
        reducerP()
    }, [totalPropuesta])
    useEffect(() => {
        reducerV()
    }, [totalVisita])

    useEffect(() => {
        reducerCC()
    }, [totalCaptado])

    

    const usersStatus = () => {
        let filterCstatus = usersFiltered.filter(user => user.status === "Contactado")
        let filterRCstatus = usersFiltered.filter(user => user.status === "Re-contactado")
        let filterVstatus = usersFiltered.filter(user => user.status === "Visita")
        let filterPstatus = usersFiltered.filter(user => user.status === "Propuesta")
        let filterRstatus = usersFiltered.filter(user => user.status === "Rechazado")
        let filterCCstatus = usersFiltered.filter(user => user.status === "Captado")
        setTotalContactados(filterCstatus)
        setTotalRechazados(filterRstatus)
        setTotalReContactados(filterRCstatus)
        setTotalPropuesta(filterPstatus)
        setTotalVisita(filterVstatus)
        setTotalCaptado(filterCCstatus)
    }


    const usersCities = () => {
        const objCity = copyUsersList.map(x => {
            return { ciudad: x.city, cantidad: 1 }
        })

        const addCant = objCity.reduce((acc, cur) => {
            const found = acc.find(i => i.ciudad === cur.ciudad);
            if (found) {
                return acc.map((x) => {
                    if (x.ciudad === cur.ciudad) {
                        return {
                            ...x,
                            cantidad: x.cantidad + cur.cantidad
                        }
                    }
                    return x;
                });
            }

            return [...acc, cur];
        }, [])
        setTotalCities(addCant)
    }

    const reducerTotal = () => {
        if (usersFiltered.length > 0) {
            let totalC = usersFiltered.length
            setUsersFilteredN(totalC)
        } else {
            setUsersFilteredN(0)
        }

    }

    const reducerC = () => {
        if (totalContactados.length > 0) {
            let totalC = totalContactados.length
            setTotalContactadosN(totalC)
        } else {
            setTotalContactadosN(0)
        }

    }
    const reducerRC = () => {
        if (totalReContactados.length > 0) {
            let totalC = totalReContactados.length
            setTotalReContactadosN(totalC)
        } else {
            setTotalReContactadosN(0)
        }

    }
    const reducerR = () => {
        if (totalRechazados.length > 0) {
            let totalC = totalRechazados.length
            setTotalRechazadosN(totalC)
        } else {
            setTotalRechazadosN(0)
        }

    }
    const reducerP = () => {
        if (totalPropuesta.length > 0) {
            let totalC = totalPropuesta.length
            setTotalPropuestaN(totalC)
        } else {
            setTotalPropuestaN(0)
        }

    }
    const reducerV = () => {
        if (totalVisita.length > 0) {
            let totalC = totalVisita.length
            setTotalVisitaN(totalC)
        } else {
            setTotalVisitaN(0)
        }

    }
    const reducerCC = () => {
        if (totalCaptado.length > 0) {
            let totalC = totalCaptado.length
            setTotalCaptadoN(totalC)
        } else {
            setTotalCaptadoN(0)
        }

    }
    //////////////////////////////////

    //////////////////////////////////
    //     LINE CHART  //////////////
    ///////////////////////////////
    // ENERO //
    const filterEneroContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 0)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterEneroReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 0)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterEneroPropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 0)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterEneroVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 0)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterEneroCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 0)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterEneroRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 0)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // FEBRERO //
    const filterFebreroContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 1)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterFebreroReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 1)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterFebreroPropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 1)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterFebreroVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 1)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterFebreroCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 1)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterFebreroRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 1)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // MARZO //
    const filterMarzoContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 2)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMarzoReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 2)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMarzoPropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 2)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMarzoVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 2)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMarzoCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 2)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMarzoRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 2)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // ABRIL //
    const filterAbrilContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 3)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAbrilReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 3)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAbrilPropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 3)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAbrilVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 3)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAbrilCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 3)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAbrilRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 3)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // MAYO //
    const filterMayoContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 4)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMayoReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 4)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMayoPropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 4)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMayoVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 4)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMayoCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 4)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterMayoRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 4)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // JUNIO //
    const filterJunioContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 5)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJunioReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 5)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJunioPropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 5)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJunioVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 5)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJunioCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 5)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJunioRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 5)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // JULIO //
    const filterJulioContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 6)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJulioReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 6)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJulioPropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 6)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJulioVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 6)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJulioCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 6)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterJulioRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 6)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // AGOSTO //
    const filterAgostoContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 7)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAgostoReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 7)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAgostoPropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 7)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAgostoVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 7)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAgostoCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 7)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterAgostoRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 7)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // SEPTIEMBRE //
    const filterSeptiembreContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 8)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterSeptiembreReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 8)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterSeptiembrePropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 8)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterSeptiembreVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 8)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterSeptiembreCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 8)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterSeptiembreRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 8)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // OCTUBRE //
    const filterOctubreContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 9)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterOctubreReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 9)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterOctubrePropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 9)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterOctubreVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 9)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterOctubreCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 9)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterOctubreRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 9)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // NOVIEMBRE //
    const filterNoviembreContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 10)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterNoviembreReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 10)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterNoviembrePropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 10)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterNoviembreVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 10)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterNoviembreCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 10)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterNoviembreRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 10)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    // DICIEMBRE //
    const filterDiciembreContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 11)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterDiciembreReContactado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 11)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Re-contactado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterDiciembrePropuesta = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 11)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Propuesta")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterDiciembreVisita = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 11)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Visita")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterDiciembreCaptado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 11)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Captado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const filterDiciembreRechazado = () => {
        let filtro = copyUsersList.filter(user => new Date(user.lastContactDate).getFullYear() == yearSelect && new Date(user.lastContactDate).getMonth() == 11)
        if (filtro.length > 0) {
            let reduce = filtro.filter(user => user.status === "Rechazado")
            if (reduce.length > 0 && reduce !== undefined) {
                let total = reduce.length
                return total
            } else {
                return 0
            }
        } else {
            return 0
        }
    }

    /////////////////////////////////
    const lastWeek = () => {
        let today = new Date()
        let lastWeek = subDays(today, 7);
        let lastWeekFormated = format(lastWeek, "MM/dd/yyyy")
        let lastWeekForr = new Date(lastWeekFormated)
        let filterLastWeek = copyUsersList.filter(user => new Date(user.lastContactDate) >= lastWeekForr)
        setUsersFiltered(filterLastWeek)
    }
    const lastMonth = () => {
        let today = new Date()
        let lastMonth = subDays(today, 30);
        let lastMonthFormated = format(lastMonth, "MM/dd/yyyy")
        let lastMonthForr = new Date(lastMonthFormated)
        let filterLastMonth = copyUsersList.filter(user => new Date(user.lastContactDate) >= lastMonthForr)
        setUsersFiltered(filterLastMonth)
    }
    const lastThreeMonths = () => {
        let today = new Date()
        let lastThreeMonths = subDays(today, 90);
        let lastThreeMonthsFormated = format(lastThreeMonths, "MM/dd/yyyy")
        let lastThreeMonthsForr = new Date(lastThreeMonthsFormated)
        let filterlastThreeMonths = copyUsersList.filter(user => new Date(user.lastContactDate) >= lastThreeMonthsForr)
        setUsersFiltered(filterlastThreeMonths)
    }
    const lastSixMonths = () => {
        let today = new Date()
        let lastSixMonths = subDays(today, 180);
        let lastSixMonthsFormated = format(lastSixMonths, "MM/dd/yyyy")
        let lastSixMonthsForr = new Date(lastSixMonthsFormated)
        let filterlastSixMonths = copyUsersList.filter(user => new Date(user.lastContactDate) >= lastSixMonthsForr)
        setUsersFiltered(filterlastSixMonths)
    }
    const lastYear = () => {
        let today = new Date()
        let lastYear = subDays(today, 365);
        let lastYearFormated = format(lastYear, "MM/dd/yyyy")
        let lastYearForr = new Date(lastYearFormated)
        let filterlastYear = copyUsersList.filter(user => new Date(user.lastContactDate) >= lastYearForr)
        setUsersFiltered(filterlastYear)
    }
    //////////////////////////////////////
    const handleYearSelector = (e) => {
        setYearSelect(e.target.value)
    }


    return (
        <>

            <div className='big-container-statistics'>
                <div className='subcontainer-statistics'>

                    <div className='totales-container'>
                        <div><h2>Total estados</h2></div>
                        <div>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Vista</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue="ultimasemana"
                                >
                                    <FormControlLabel onClick={lastWeek} value="ultimasemana" control={<Radio />} label="Última semana" />
                                    <FormControlLabel onClick={lastMonth} value="ultimomes" control={<Radio />} label="Último mes" />
                                    <FormControlLabel onClick={lastThreeMonths} value="ultimostresmeses" control={<Radio />} label="Últimos 3 meses" />
                                    <FormControlLabel onClick={lastSixMonths} value="ultimosseismeses" control={<Radio />} label="Últimos 6 meses" />
                                    <FormControlLabel onClick={lastYear} value="ultimosdocemeses" control={<Radio />} label="Últimos 12 meses" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                  

                        <BarChart
                            filterEneroContactado={filterEneroContactado}
                            totalContactadosN={totalContactadosN}
                            totalReContactadosN={totalReContactadosN}
                            totalPropuestaN={totalPropuestaN}
                            totalVisitaN={totalVisitaN}
                            totalCaptadoN={totalCaptadoN}
                            totalRechazadosN={totalRechazadosN}
                            usersFilteredN={usersFilteredN}
                        />
                    </div>

                    <div className='totales-container'>
                        <div><h2>Progreso de estados</h2></div>
                        <div >
                            <FormControl size="small" variant="outlined" sx={{ m: 0, width: 300 }}>
                                <InputLabel id="demo-simple-select-standard-label" size="small" >Año</InputLabel>
                                <Select
                                    defaultValue={yearSelect}
                                    label="Año"
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    onChange={handleYearSelector}
                                    value={yearSelect}
                                >
                                    <MenuItem value={"2022"}>2022</MenuItem>
                                    <MenuItem value={"2023"}>2023</MenuItem>
                                    <MenuItem value={"2024"}>2024</MenuItem>
                                    <MenuItem value={"2025"}>2025</MenuItem>
                                    <MenuItem value={"2026"}>2026</MenuItem>
                                    <MenuItem value={"2027"}>2027</MenuItem>
                                    <MenuItem value={"2028"}>2028</MenuItem>
                                    <MenuItem value={"2029"}>2029</MenuItem>
                                    <MenuItem value={"2030"}>2030</MenuItem>
                                    <MenuItem value={"2031"}>2031</MenuItem>
                                    <MenuItem value={"2032"}>2032</MenuItem>
                                    <MenuItem value={"2033"}>2033</MenuItem>
                                    <MenuItem value={"2034"}>2034</MenuItem>
                                    <MenuItem value={"2035"}>2035</MenuItem>
                                    <MenuItem value={"2036"}>2036</MenuItem>
                                    <MenuItem value={"2037"}>2037</MenuItem>
                                    <MenuItem value={"2038"}>2038</MenuItem>
                                    <MenuItem value={"2039"}>2039</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <LineChart
                            usersFilteredN={usersFilteredN}
                            filterEneroContactado={filterEneroContactado}
                            filterEneroReContactado={filterEneroReContactado}
                            filterEneroPropuesta={filterEneroPropuesta}
                            filterEneroVisita={filterEneroVisita}
                            filterEneroCaptado={filterEneroCaptado}
                            filterEneroRechazado={filterEneroRechazado}

                            filterFebreroContactado={filterFebreroContactado}
                            filterFebreroReContactado={filterFebreroReContactado}
                            filterFebreroPropuesta={filterFebreroPropuesta}
                            filterFebreroVisita={filterFebreroVisita}
                            filterFebreroCaptado={filterFebreroCaptado}
                            filterFebreroRechazado={filterFebreroRechazado}

                            filterMarzoContactado={filterMarzoContactado}
                            filterMarzoReContactado={filterMarzoReContactado}
                            filterMarzoPropuesta={filterMarzoPropuesta}
                            filterMarzoVisita={filterMarzoVisita}
                            filterMarzoCaptado={filterMarzoCaptado}
                            filterMarzoRechazado={filterMarzoRechazado}

                            filterAbrilContactado={filterAbrilContactado}
                            filterAbrilReContactado={filterAbrilReContactado}
                            filterAbrilPropuesta={filterAbrilPropuesta}
                            filterAbrilVisita={filterAbrilVisita}
                            filterAbrilCaptado={filterAbrilCaptado}
                            filterAbrilRechazado={filterAbrilRechazado}

                            filterMayoContactado={filterMayoContactado}
                            filterMayoReContactado={filterMayoReContactado}
                            filterMayoPropuesta={filterMayoPropuesta}
                            filterMayoVisita={filterMayoVisita}
                            filterMayoCaptado={filterMayoCaptado}
                            filterMayoRechazado={filterMayoRechazado}

                            filterJunioContactado={filterJunioContactado}
                            filterJunioReContactado={filterJunioReContactado}
                            filterJunioPropuesta={filterJunioPropuesta}
                            filterJunioVisita={filterJunioVisita}
                            filterJunioCaptado={filterJunioCaptado}
                            filterJunioRechazado={filterJunioRechazado}

                            filterJulioContactado={filterJulioContactado}
                            filterJulioReContactado={filterJulioReContactado}
                            filterJulioPropuesta={filterJulioPropuesta}
                            filterJulioVisita={filterJulioVisita}
                            filterJulioCaptado={filterJulioCaptado}
                            filterJulioRechazado={filterJulioRechazado}

                            filterAgostoContactado={filterAgostoContactado}
                            filterAgostoReContactado={filterAgostoReContactado}
                            filterAgostoPropuesta={filterAgostoPropuesta}
                            filterAgostoVisita={filterAgostoVisita}
                            filterAgostoCaptado={filterAgostoCaptado}
                            filterAgostoRechazado={filterAgostoRechazado}

                            filterSeptiembreContactado={filterSeptiembreContactado}
                            filterSeptiembreReContactado={filterSeptiembreReContactado}
                            filterSeptiembrePropuesta={filterSeptiembrePropuesta}
                            filterSeptiembreVisita={filterSeptiembreVisita}
                            filterSeptiembreCaptado={filterSeptiembreCaptado}
                            filterSeptiembreRechazado={filterSeptiembreRechazado}

                            filterOctubreContactado={filterOctubreContactado}
                            filterOctubreReContactado={filterOctubreReContactado}
                            filterOctubrePropuesta={filterOctubrePropuesta}
                            filterOctubreVisita={filterOctubreVisita}
                            filterOctubreCaptado={filterOctubreCaptado}
                            filterOctubreRechazado={filterOctubreRechazado}

                            filterNoviembreContactado={filterNoviembreContactado}
                            filterNoviembreReContactado={filterNoviembreReContactado}
                            filterNoviembrePropuesta={filterNoviembrePropuesta}
                            filterNoviembreVisita={filterNoviembreVisita}
                            filterNoviembreCaptado={filterNoviembreCaptado}
                            filterNoviembreRechazado={filterNoviembreRechazado}

                            filterDiciembreContactado={filterDiciembreContactado}
                            filterDiciembreReContactado={filterDiciembreReContactado}
                            filterDiciembrePropuesta={filterDiciembrePropuesta}
                            filterDiciembreVisita={filterDiciembreVisita}
                            filterDiciembreCaptado={filterDiciembreCaptado}
                            filterDiciembreRechazado={filterDiciembreRechazado}
                        />
                    </div>
                    <div className='totales-container-pie'>
                        <div><h2>Total de ciudades</h2></div>
                        <BarChart2
                            totalCities={totalCities}
                        />
                    </div>

                </div>
            </div>



        </>


    )

}