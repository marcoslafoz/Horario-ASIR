import React, { useEffect, useState } from 'react'
import horarios from '../../assets/json/horario.json'
import './counter.css'

interface Horario {
  horaInicio: string
  horaFin: string
  asignatura: string
}

export const Counter: React.FC = () => {
  const [asignaturaActual, setAsignaturaActual] = useState<string | null>(null)
  const [tiempoRestante, setTiempoRestante] = useState<string | null>(null)

  const obtenerDiaSemana = (): string => {
    const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
    const fechaActual = new Date()
    return diasSemana[fechaActual.getDay()]
  }

  const convertirHora = (hora: string): Date => {
    const [horas, minutos] = hora.split(":").map(Number)
    const ahora = new Date()
    ahora.setHours(horas, minutos, 0, 0)
    return ahora
  }

  const verificarAsignaturaActual = () => {
    const diaActual = obtenerDiaSemana()
    const horarioHoy = (horarios as Record<string, Horario[]>)[diaActual]

    if (!horarioHoy) {
      setAsignaturaActual("No hay clases hoy")
      setTiempoRestante(null)
      return
    }

    const ahora = new Date()

    for (const clase of horarioHoy) {
      const horaInicio = convertirHora(clase.horaInicio)
      const horaFin = convertirHora(clase.horaFin)

      if (ahora >= horaInicio && ahora <= horaFin) {
        setAsignaturaActual(clase.asignatura)

        const diferencia = horaFin.getTime() - ahora.getTime()
        const minutosRestantes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60))
        const horasRestantes = Math.floor(diferencia / (1000 * 60 * 60))

        let tiempoFormatted = ""
        if (horasRestantes > 0) {
          tiempoFormatted += `${horasRestantes} ${horasRestantes === 1 ? 'hora' : 'horas'}`
        }
        if (minutosRestantes > 0) {
          if (horasRestantes > 0) tiempoFormatted += ' y '
          tiempoFormatted += `${minutosRestantes} ${minutosRestantes === 1 ? 'minuto' : 'minutos'}`
        }

        setTiempoRestante(tiempoFormatted)

        const tiempoRestanteFormatted = `${horasRestantes.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`
        document.title = `Horario - ${clase.asignatura} ${tiempoRestanteFormatted}`
        return
      }
    }

    setAsignaturaActual("")
    setTiempoRestante(null)
  }

  useEffect(() => {
    verificarAsignaturaActual()

    const intervalo = setInterval(() => {
      verificarAsignaturaActual()
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="p-4 text-white text-opacity-50 mt-3 text text-center counter ">
      {asignaturaActual ? (
        <>
          {tiempoRestante && (
            <p className="text-lg">Tiempo restante de {asignaturaActual}: {tiempoRestante}</p>
          )}
        </>
      ) : (
        <p className="text-lg"></p>
      )}
    </div>
  )
}
