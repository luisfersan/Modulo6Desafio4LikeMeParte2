// Importo el módulo Express (Framework web para Node.js). Almaceno require('express') en la constante "express"
const express = require('express')

// Importo el paquete CORS (Cross-Origin Resource Sharing)
const cors = require('cors')

// Importo el objeto Pool del paquete pg, que es un cliente de PostgreSQL para Node.js
const { Pool } = require('pg')

// Creo la aplicación Express
const app = express()
const port = 3000

// Middleware
app.use(cors()) // Habilito CORS
app.use(express.json()) // Habilito el manejo de JSON en el cuerpo de las peticiones

// Realizo la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres', // Usuario de PostgreSQL
  host: '127.0.0.1', // Servidor de la BDD
  database: 'likeme', // Nombre de la base de datos
  password: 'admin1234', // Contraseña de PostgreSQL
  port: 5432, // Puerto por defecto de PostgreSQL
})

// Creo la ruta GET para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts')
    res.json(result.rows) // Devuelvo los posts como JSON
  } catch (error) {
    console.error(error)
    res.status(500).send('Error en el servidor')
  }
})

// Creo la ruta POST para agregar un nuevo post
app.post('/posts', async (req, res) => {
  const { titulo, url, descripcion } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *',
      [titulo, url, descripcion]
    )
    res.status(201).json(result.rows[0]) // Devuelvo el nuevo post creado
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al agregar el post')
  }
})

// Agrego la ruta PUT para dar "like" a un post
app.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).send('Post no encontrado')
    }
    res.json(result.rows[0]) // Devuelvo el post actualizado
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al incrementar el like')
  }
})

// Agrego la ruta DELETE para eliminar un post
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).send('Post no encontrado')
    }
    res.json({ message: 'Post eliminado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al eliminar el post')
  }
})

// Inicio el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
