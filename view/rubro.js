require("../utils/jwt")
const express = require("express")
const app = express()
const {createToken, ensureToken} = require("../utils/jwt");
const RubroController = require("../controller/rubro.controller")

app.post("/NuevoRubroDepartamento",ensureToken,async function(req,res)
{
    try {
        var data = await RubroController.insertNuevoRubroController(req.body.departamento,req.body.rubro,req.body.motivo)
        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Datos consutados con éxito' : 'No existen datos disponibles'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})

app.post("/AllRipoRubro",ensureToken,async function(req,res)
{
    try {
        var data = await RubroController.readAllTipoRubroController()
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
app.post("/PagoRubroAdmin",ensureToken,async function(req,res)
{
    try {
        var data = await RubroController.readPagoRubroController(req.body.departamento,req.body.estado)
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


app.post("/PagoRubroUsuario",ensureToken,async function(req,res)
{
    try {
        var data = await RubroController.readPagoRubroUsuarioController(req.body.data.CodiUsua,req.body.estado)
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


app.put("/sendPagoRubro",ensureToken,async function(req,res)
{
    try {
        var data = await RubroController.sendReciboPagoRubroController(req.body.id_pago,req.body.foto,req.body.cuenta)

        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Datos consutados con éxito' : 'No existen datos disponibles'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})


app.put("/updatePagoRubro",ensureToken,async function(req,res)
{
    try {
        var data = await RubroController.updatePagoRubroController(req.body.id_pago,req.body.estado,req.body.detalle)

        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Datos consutados con éxito' : 'No existen datos disponibles'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})

module.exports = app