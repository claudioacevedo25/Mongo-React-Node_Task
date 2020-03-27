const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let taskSchema = new Schema({
    nombre: {
        type:String, 
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'Es necesario describir la tarea']
    }

})

module.exports = mongoose.model('Task', taskSchema)