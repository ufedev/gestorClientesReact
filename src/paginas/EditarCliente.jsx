import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Formulario from "../components/Formulario"
const EditarCliente = () => {
  const { id } = useParams()
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)
  useEffect(() => {
    async function consulta() {
      setCargando(!cargando)
      const url = `${import.meta.env.VITE_API_URL}/${id}`
      const req = await fetch(url)
      const res = await req.json()

      setCliente(res)
      setCargando(false)
    }
    consulta()
  }, [])

  return (
    <>
      {cliente?.nombre ? (
        <>
          <h1 className="text-4xl text-blue-900 uppercase font-bold">
            Editar Cliente
          </h1>
          <p className="mt-2 font-bold text-gray-700">
            Editando La información del cliente{" "}
          </p>
          <Formulario obj={cliente} cargando={cargando} />
        </>
      ) : (
        <>
          <h1 className="text-4xl text-blue-900 uppercase font-bold">Error</h1>
          <p className="mt-2 font-bold text-gray-700">
            {" "}
            No se encontro la información solicitada{" "}
          </p>
        </>
      )}
    </>
  )
}

export default EditarCliente
