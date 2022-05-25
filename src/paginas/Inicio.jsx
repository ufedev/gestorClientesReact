import { useState, useEffect } from "react"
import Cliente from "../components/Cliente"
import Spinner from "../components/Spinner"
const Inicio = () => {
  //States
  const [clientes, setClientes] = useState([])
  const [spinner, setSpinner] = useState(false)
  //Effects
  useEffect(() => {
    const consultaClientes = async () => {
      const url = `${import.meta.env.VITE_API_URL}`
      const req = await fetch(url)
      const res = await req.json()

      setClientes(res)
      setSpinner(false)
    }
    setSpinner(true)
    setTimeout(() => {
      consultaClientes()
    }, 1000)
  }, [])

  const handleEliminar = async (cliente) => {
    const confirmar = confirm(
      "Esta seguro que desea eliminar al cliente " + cliente.nombre
    )

    if (confirmar) {
      setSpinner(true)

      const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
      const req = await fetch(url, options)
      await req.json()

      const nuevoarray = clientes.filter((client) => client.id !== cliente.id)
      setClientes(nuevoarray)
      setSpinner(false)
    }
  }
  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-4xl text-blue-900 uppercase font-bold">
            Clientes
          </h1>
          <p className="mt-2 font-bold text-gray-700">
            Administra tus clientes{" "}
          </p>

          <table className="w-full mt-10 bg-white shadow table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Empresa</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {clientes.map((cliente) => (
                <Cliente
                  key={cliente.id}
                  cliente={cliente}
                  handleEliminar={handleEliminar}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default Inicio
