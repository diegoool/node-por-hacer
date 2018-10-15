const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completada o pendiente la tarea'

}
const argv = require('yargs')
    .command('crear', 'Crea elemento ToDo', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado de una tarea ToDo', {
        descripcion,
        completado
    })
    .command('borrar', 'Borrar una tarea ToDo', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}