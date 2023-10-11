require("../utils/jwt")
const express = require("express")
const app = express()
const {createToken, ensureToken} = require("../utils/jwt");
const SoporteController = require("../controller/soporte.controller");


app.post("/create_soporte",ensureToken,async function(req,res)
{
    try {
        // req.body.data.CodiUsua

        var data = await SoporteController.insertNuevoSoporteController(req.body.tipo_soporte,
            req.body.detalle_soporte, req.body.data.CodiUsua,
            req.body.url_img, req.body.url_archivo, req.body.asunto_soporte)

        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Ticket actualizado con éxito' : 'No actualizo el TICKET'
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString(),
        })
    }
})
app.get("/all_tipo_soporte",async function(req,res){
    try {
        var data = await SoporteController.readAllTipoSoporteController()

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

app.post("/all_soporte",ensureToken,async function(req,res)
{
    try {
        console.log(req.body.data.CodiUsua)
        var data = await SoporteController.readAllSoporteController(req.body.tipo_soporte,req.body.data.CodiUsua,req.body.estado_soporte)

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

app.post("/all_usuario_soporte",ensureToken,async function(req,res)
{
    try {
        console.log(req.body.data.CodiUsua)
        var data = await SoporteController.readAllSoporteUsuarioController(req.body.tipo_soporte,req.body.data.CodiUsua,req.body.estado_soporte)

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


app.put("/update_soporte",ensureToken,async function(req,res)
{
    try {
        // req.body.data.CodiUsua

        var data = await SoporteController.updateSoporteController(req.body.id_soporte,
            req.body.data.CodiUsua,req.body.solucion_ticket,req.body.estado)

        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Ticket actualizado con éxito' : 'No actualizo el TICKET'
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString(),
        })
    }
})


module.exports = app