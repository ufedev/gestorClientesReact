import { useState, useEffect } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import Alerta from "./Alerta"
import Spinner from "./Spinner"
const Formulario = ({ obj, cargando }) => {
  const navigate = useNavigate()
  const { nombre, empresa, email, telefono, nota } = obj

  async function handleSubmit(values) {
    try {
      let url
      let opciones
      if (obj.id) {
        url = `${import.meta.env.VITE_API_URL}/${obj.id}`
        opciones = {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      } else {
        url = import.meta.env.VITE_API_URL
        opciones = {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      }
      const req = await fetch(url, opciones)

      await req.json()
      navigate("/clientes")
    } catch (error) {
      console.log(error)
    }
  }

  const formikScheme = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "nombre muy corto")
      .required("Debe contenener un nombre"),
    empresa: Yup.string().required("Falta el nombre de la Empresa"),
    email: Yup.string().email("Email no válido").required("Falta el Email"),
    telefono: Yup.number()
      .integer("sin guiones")
      .positive("No valido")
      .min(6, "telefono muy corto"),
  })
  return cargando ? (
    <Spinner />
  ) : (
    <div className="py-10 px-5 bg-white md:w-3/4 mx-auto mt-10 rounded-md shadow-md">
      <h1 className="text-center text-gray-700 font-bold text-xl uppercase">
        {obj?.nombre ? "Editar Cliente" : "Añadir Cliente"}
      </h1>

      <Formik
        initialValues={{
          nombre: nombre ?? "",
          empresa: empresa ?? "",
          email: email ?? "",
          telefono: telefono ?? "",
          nota: nota ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (val, { resetForm }) => {
          await handleSubmit(val)
          resetForm()
        }}
        validationSchema={formikScheme}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-10 relative">
                <label className="text-gray-700 font-bold" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  name="nombre"
                  id="nombre"
                  type="text"
                  placeholder="Nombre del Cliente"
                  className="block p-2 bg-gray-100 w-full mt-2"
                />

                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className="mb-10 relative">
                <label className="text-gray-700 font-bold" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  name="empresa"
                  id="empresa"
                  type="text"
                  placeholder="empresa del Cliente"
                  className="block p-2 bg-gray-100 w-full mt-2 "
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-10 relative">
                <label className="text-gray-700 font-bold" htmlFor="email">
                  E-mail:
                </label>
                <Field
                  name="email"
                  id="email"
                  type="text"
                  placeholder="email del Cliente"
                  className="block p-2 bg-gray-100 w-full mt-2 "
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-10 relative">
                <label className="text-gray-700 font-bold" htmlFor="telefono">
                  Telefono:
                </label>
                <Field
                  name="telefono"
                  id="telefono"
                  type="number"
                  placeholder="telefono del Cliente"
                  className="block p-2 bg-gray-100 w-full mt-2 "
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-10 relative">
                <label className="text-gray-700 font-bold" htmlFor="nota">
                  Notas:
                </label>
                <Field
                  name="nota"
                  as="textarea"
                  id="nota"
                  type="text"
                  placeholder="nota del Cliente"
                  className="block p-2 bg-gray-100 w-full mt-2 h-40 "
                />
              </div>

              <input
                type="submit"
                value={obj?.nombre ? "Editar Cliente" : "Añadir Cliente"}
                className="w-full p-2 text-white bg-blue-800 uppercase font-bold text-lg mt-10 cursor-pointer hover:bg-blue-600"
              />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

Formulario.defaultProps = {
  obj: {},
  cargando: false,
}
export default Formulario
