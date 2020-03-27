const express = require('express');
const app = express()

const Task = require('../models/task')



app.get('/', (req, res) => {

    Task.find()
        .exec( (err, tasks) => {
            if(err){
               return res.status(500).json({
                    ok:false,
                    err
                })
            }
                res.json({
                    ok: true,
                    tasks
               })
            })
   
})





app.get('/:id', (req, res) => {

    let id = req.params.id;
    Task.findById(id, (err, taskDB) => {
        if(err){
           return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!taskDB){
            return res.status(400).json({
                ok:false,
                message: 'El id no existe'
            })
        }
            res.json({
                ok: true,
                taskDB
           })
    })

})




app.post('/', (req, res) => {


    //OTRA FORMA DE IMPLEMENTAR 
    // const {nombre, descripcion} = req.body;
    // const task = new Task({nombre, descripcion});
    // await task.save();
    // res.json({status:'task saved'})
   
    let body = req.body;

    let task = new Task({
        nombre: body.nombre,
        descripcion: body.descripcion
    })

    task.save( (err, taskDB) => {

        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!taskDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
            res.json({
                ok: true,
                taskDB
           })
        })
        
})





app.put('/:id', (req, res) => {
   
    // const {nombre, descripcion} = req.body;
    // const updateTask = {nombre, descripcion};
    // Task.findByIdAndUpdate(req.params.id, updateTask);
    // res.json({staus:' actualizado'})


    let id = req.params.id;
    let body = req.body;

    let updateTask = {
        nombre: body.nombre,
        descripcion: body.descripcion
    }

    Task.findByIdAndUpdate(id, updateTask, {new:true, runValidators: true}, (err, taskDB) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!taskDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
            res.json({
                ok: true,
                message: 'Se ha actualizado la tarea',
                taskDB
           })
        })
})





app.delete('/:id', (req, res) => {

    let id = req.params.id;

    Task.findByIdAndRemove(id, (err, taskDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!taskDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
            res.json({
                ok: true,
                message: 'La tarea ha sido eliminada',
                taskDB
           })
    })

})

module.exports = app