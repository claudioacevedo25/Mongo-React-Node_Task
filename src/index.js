require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();

//HABILITAR LA CARPETA PUBLICA
app.use(express.static(path.join(__dirname, './public')));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());



//USO DE LAS RUTAS 
//notese que el primer argumento es el prefijo donde queremos q esten nuestras rutas, util en este caso porque manejamos un solo esquema
 app.use('/api/task', require('./routes/task.routes'));


//DB
mongoose.connect(process.env.URLDB, 
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
    (err, res) => {
    if(err) throw err;
    console.log('base de datos Online');
  });
   
  

//LISTENER PORT
app.listen(process.env.PORT, () => {
    console.log(`escuchand puerto`,process.env.PORT);
})