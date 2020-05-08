const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales', testimoniales
    })
}

exports.guardarTestimoniales = async (req, res) => {

    let { nombre, correo, mensaje } = req.body;

    let errores = [];

    if (!nombre)    { errores.push( { 'mensaje': 'Falta tu nombre' } ) };
    if (!correo)    { errores.push( { 'mensaje': 'Falta tu correo electrónico' } ) };
    if (!mensaje)   { errores.push( { 'mensaje': 'Falta tu mensaje' } ) };

    if (errores.length > 0) {
        // Mostrar vista con errores
        res.render('testimoniales', {
            errores, nombre, correo, mensaje
        })
    } else {
        // Guardar testimonial
        const testimonial = await Testimonial.create({ nombre, correo, mensaje })
        res.redirect('/testimoniales')
    }
}