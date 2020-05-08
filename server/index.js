// Importar express
const express = require('express');

const path = require('path');
const bodyParser = require('body-parser')
const routes = require('./routes');
const configs = require('./config');

require('dotenv').config({path: 'variables.env'})

// Configurar express
const app = express();

// Habilitar pug
app.set('view engine', 'pug');

// Agregar las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar carpeta estática llamada public
app.use(express.static('public'));

// Validar si estamos en desarrollo o en producción
const config = configs[app.get('env')];         

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Obtener el año actual y la página en curso (ruta)
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.añoActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    console.log(res.locals);
    return next();
})

// Ejecutamos el bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Cargar las rutas
app.use('/', routes());

// Configuración para Host y Puerto

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor está funcionando');
});