require("../utils/jwt")
const express = require("express")
const app = express()
const ArrendamientoController = require("../controller/arrendamiento.controller")
const {createToken, ensureToken} = require("../utils/jwt");

app.put("/terminar_arrendamiento",ensureToken,async function(req,res){
    try {
        var data = await ArrendamientoController.terminarArrendamientoController(req.body.arrendamiento,
            req.body.detalle_desalojo)

        res.status(200).json({
            status_code: data  ? 200 : 300,
            msm: data  ? 'Creado con éxito' : 'No se ha podido crear' ,
            datos: data
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString(),
            datos:[]
        })
    }
})

app.post("/insert_arrendamiento",ensureToken,async function(req,res){
    try {
        var data = await ArrendamientoController.insertArrendamientoController(req.body.usuario,
            req.body.departamento,req.body.fecha,req.body.detalle)

        res.status(200).json({
            status_code: data  ? 200 : 300,
            msm: data  ? 'Creado con éxito' : 'No se ha podido crear' ,
            datos: data
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString(),
            datos:[]
        })
    }
})

app.post("/read_arrendamiento",ensureToken,async function(req,res){
    try {
        var data = await ArrendamientoController.readArrendamientoController()

        res.status(200).json({
            status_code: data.length > 0 ? 200 : 300,
            msm: data.length > 0 ? 'Datos consutados con éxito' : 'No existen datos disponibles' ,
            datos: data
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString(),
            datos:[]
        })
    }
})


module.exports = app