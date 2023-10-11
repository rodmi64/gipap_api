const express = require("express")
const app = express()
const ServicioController = require("../controller/servicio.controller")
const {ensureToken} = require("../utils/jwt");


app.get("/readTipoServicio",async function (req,res)
{
    try {
        var data = await ServicioController.readTipoServicioController()

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

app.post("/readAllServicios",ensureToken,async function (req,res)
{
    try {
        var data = await ServicioController.readAllReservasController(req.body.fecha,req.body.servicios)

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


app.post("/nuevoServicio",ensureToken,async function (req,res)
{
    try {
        var data = await ServicioController.insertNuevoServicioController(req.body.name,req.body.hora_inicio,req.body.hora_fin)

        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Datos consutados con éxito' : 'No existen datos disponibles' ,
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})

app.put("/updateServicio",ensureToken,async function(req,res)
{
    try {
        var data = await ServicioController.updateEstadoServicioController(req.body.servicio,req.body.estado)

        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Datos consutados con éxito' : 'No existen datos disponibles' ,
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})


app.post("/readAllServiciosUsuario",ensureToken,async function (req,res)
{
    try {
        var data = await ServicioController.readAllReservasUsuarioController(req.body.fecha,
            req.body.servicios,req.body.data.CodiUsua)

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


app.post("/nuevaReserva",ensureToken,async function(req,res)
{
    try {
        var data = await ServicioController.insertNuevaReservaController(req.body.servicio,
            req.body.data.CodiUsua,req.body.hora_inicio_reserva, req.body.hora_fin_reserva,
            req.body.fechaReserva)

        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Datos consutados con éxito' : 'No existen datos disponibles' ,
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})

module.exports = app