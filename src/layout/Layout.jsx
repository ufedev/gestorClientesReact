import { Outlet, Link, useLocation } from "react-router-dom"

const Layout = () => {
  const locacion = useLocation()
  const urlActual = locacion.pathname

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h1 className="text-white text-4xl font-bold text-center">
          CRM Clientes
        </h1>

        <nav className="mt-20 p-2">
          <Link
            className={`${
              urlActual === "/clientes" ? "text-blue-300" : "text-white"
            } block text-xl text-white mt-2 hover:text-blue-200`}
            to="/clientes"
          >
            Clientes
          </Link>
          <Link
            className={`${
              urlActual === "/clientes/nuevo" ? "text-blue-300" : "text-white"
            } block text-xl text-white mt-2 hover:text-blue-200`}
            to="/clientes/nuevo"
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>

      <div className="md:w-3/4 p-10 md:h-screen md:overflow-scroll">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
