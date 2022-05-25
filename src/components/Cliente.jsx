import { useNavigate } from "react-router-dom"

const Cliente = ({ cliente, handleEliminar }) => {
  const { nombre, email, empresa, telefono, nota, id } = cliente
  const navigate = useNavigate()

  return (
    <tr className="odd:bg-slate-100 border-b hover:bg-gray-200">
      <td className="p-3 text-center">{nombre}</td>
      <td className="p-3">
        <p className="font-bold text-gray-700">
          Email:{"  "}
          <span className="font-normal">{email}</span>
        </p>
        <p className="font-bold text-gray-700">
          Tel:{"  "}
          <span className="font-normal">{telefono}</span>
        </p>
      </td>
      <td className="p-3 text-center">{empresa}</td>
      <td className="p-3 ">
        <button
          onClick={() => navigate(`/clientes/${id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 w-full block p-2 text-xs font-bold text-white "
        >
          Ver
        </button>
        <button
          onClick={() => navigate(`/clientes/editar/${id}`)}
          className="mt-3 bg-blue-600 hover:bg-blue-700 w-full block p-2 text-xs font-bold text-white "
        >
          Editar
        </button>
        <button
          onClick={() => handleEliminar(cliente)}
          className="mt-3 bg-red-800 hover:bg-red-700 w-full block p-2 text-xs font-bold text-white "
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Cliente
