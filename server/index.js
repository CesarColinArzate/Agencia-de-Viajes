// Importar Express
const express = require('express')

// Importar path
const path = require('path')

// Importar bodyParser
const bodyParser = require('body-parser')

// Importar rutas
const routes = require('./routes')

// Importar server/config/index.js
const configs = require('./config')

// Importar variables de entorno
require('dotenv').config({path: 'variables.env'})

// Configurar servidor Express
const app = express()

// Habilitar pug template engine
app.set('view engine', 'pug')

// Añadir vistas
app.set('views', path.join(__dirname, './views'))

// Cargar carpeta estática public
app.use(express.static('public'))

// Obtener ambiente de desarrollo
const config = configs[app.get('env')]
// Crear variable para el sitio web - titulo
app.locals.titulo = config.nombresitio

// Obtenter el año en curso
app.use((req, res, next) => {
    const fecha = new Date()
    res.locals.añoEnCurso = fecha.getFullYear()
    return next()
})

// Obtenter la ruta actual - para determinar en que página estamos
app.use((req, res, next) => {
    res.locals.ruta = req.path
    console.log(res.locals)
    return next()
})

// Ejecutamos el bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// Cargar las rutas
app.use('/', routes())

// Host y Puerto para la app
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, host, () => {
    console.log('Servidor OK')
})