import Formulario from "../components/Formulario"

const NuevoCliente = () => {
  return (
    <>
      <h1 className="text-4xl text-blue-900 uppercase font-bold">
        Nuevo Cliente
      </h1>
      <p className="mt-2 font-bold text-gray-700">
        Llene los campos a continuation{" "}
      </p>

      <Formulario />
    </>
  )
}

export default NuevoCliente
