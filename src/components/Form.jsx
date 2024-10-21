import { useState } from 'react'

function Form({ setTitulo, setImgSRC, setDescripcion, agregarPost }) {
  const [mensaje, setMensaje] = useState('')
  const [camposVacios, setCamposVacios] = useState({
    titulo: false,
    imgSrc: false,
    descripcion: false,
  })

  // Función para manejar el envío del formulario
  const manejarEnvio = () => {
    const titulo = document.getElementById('titulo').value.trim()
    const imgSrc = document.getElementById('imgSrc').value.trim()
    const descripcion = document.getElementById('descripcion').value.trim()

    // Validación de campos
    const camposVacios = {
      titulo: titulo === '',
      imgSrc: imgSrc === '',
      descripcion: descripcion === '',
    }

    setCamposVacios(camposVacios)

    // Verifico si algún campo está vacío
    if (
      camposVacios.titulo ||
      camposVacios.imgSrc ||
      camposVacios.descripcion
    ) {
      setMensaje('Todos los campos son obligatorios')
      return
    }

    // Si todos los campos están diligenciados
    setTitulo(titulo)
    setImgSRC(imgSrc)
    setDescripcion(descripcion)

    // Llamo a la función agregarPost, que debe estar definida en el componente principal (App)
    agregarPost(titulo, imgSrc, descripcion)

    // Mostrar el mensaje de éxito
    setMensaje('Imagen agregada satisfactoriamente')

    // Limpiar el formulario
    document.getElementById('titulo').value = ''
    document.getElementById('imgSrc').value = ''
    document.getElementById('descripcion').value = ''
  }

  return (
    <div className="formulario">
      {/* Título del formulario */}
      <h4 className="text-center mb-4">Agregar Post</h4>

      <div className="mb-3">
        <label
          htmlFor="titulo"
          className="form-label"
        >
          Título
        </label>
        <input
          type="text"
          className={`form-control ${
            camposVacios.titulo ? 'border-danger' : 'bg-primary text-white'
          }`}
          id="titulo"
          placeholder="Ingresa el título"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="imgSrc"
          className="form-label"
        >
          URL de la Imagen
        </label>
        <input
          type="text"
          className={`form-control ${
            camposVacios.imgSrc ? 'border-danger' : 'bg-primary text-white'
          }`}
          id="imgSrc"
          placeholder="Ingresa la URL de la imagen"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="descripcion"
          className="form-label"
        >
          Descripción
        </label>
        <textarea
          className={`form-control ${
            camposVacios.descripcion ? 'border-danger' : 'bg-primary text-white'
          }`}
          id="descripcion"
          rows="3"
          placeholder="Ingresa la descripción"
        ></textarea>
      </div>

      {/* Botón para agregar el post */}
      <button
        onClick={manejarEnvio}
        className="btn btn-primary"
      >
        Agregar
      </button>

      {/* Mensaje de éxito o error */}
      {mensaje && (
        <div
          className={`alert mt-3 ${
            mensaje.includes('satisfactoriamente')
              ? 'alert-success'
              : 'alert-danger'
          }`}
        >
          {mensaje}
        </div>
      )}
    </div>
  )
}

export default Form
