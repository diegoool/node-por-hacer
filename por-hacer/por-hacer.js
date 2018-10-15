const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    // Vamos a intentar cargar la DB
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        // Si el JSON no es valido por ejemplo esta vacio, se crea un arreglo vacio para hacerlo valido
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = () => {

    cargarDB();

    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    // Si no coincide regresa un -1
    // Si encuentra va a devolver un valor index sobre el 0, entonces tomamos el valor de Index
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListadoPorHacer;
        guardarDB();
        return true;
    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}