import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
const VerCliente = () => {
  const { id } = useParams()
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    setCargando(!cargando)
    async function consulta() {
      const url = `${import.meta.env.VITE_API_URL}/${id}`
      const req = await fetch(url)
      const res = await req.json()

      setCliente(res)
      setTimeout(() => {
        setCargando(false)
      }, 500)
    }
    consulta()
  }, [])

  const { nombre, empresa, telefono, email, nota } = cliente

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <>
      <h1 className="text-4xl text-blue-900 uppercase font-bold">Error</h1>
      <p className="mt-2 font-bold text-gray-700">
        {" "}
        No se encontro la información solicitada{" "}
      </p>
    </>
  ) : (
    <>
      <h1 className="text-4xl text-blue-900 uppercase font-bold">
        Cliente: <span className="capitalize">{nombre}</span>
      </h1>
      <p className="mt-2 font-bold text-gray-700">Información del cliente </p>

      <div className="mt-10">
        {empresa && (
          <p className="font-bold text-gray-700">
            <span className="font-black uppercase text-gray-800">
              empresa:{" "}
            </span>
            {empresa}
          </p>
        )}
        {email && (
          <p className="font-bold text-gray-700">
            <span className="font-black uppercase text-gray-800">Email: </span>
            {email}
          </p>
        )}
        {telefono && (
          <p className="font-bold text-gray-700">
            <span className="font-black uppercase text-gray-800">
              telefono:{" "}
            </span>
            {telefono}
          </p>
        )}
        {nota && (
          <p className="font-bold text-gray-700">
            <span className="font-black uppercase text-gray-800">nota: </span>
            {nota}
          </p>
        )}
      </div>
    </>
  )
}

export default VerCliente
