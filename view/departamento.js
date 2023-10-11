require("../utils/jwt")
const express = require("express")
const app = express()
const DepartamentoController = require("../controller/departamento.controller")
const {createToken, ensureToken} = require("../utils/jwt");


app.post("/read_departamento_ocupados",ensureToken,async function(req,res)
{
    try {
        var data = await DepartamentoController.readAllDepartamentoOcupadoController()

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

app.post("/read_departamento_libre",ensureToken,async function(req,res)
{
    try {
        var data = await DepartamentoController.readAllDepartamentoLibreController()

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

app.get("/read_tipo_departamento",async function(req,res){
    try {
        var data = await DepartamentoController.readTipoDepartamentoModel()

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

app.post("/read_departamento",ensureToken,async function(req,res){
    try {
        var data = await DepartamentoController.readAllDepartamentoController(req.body.tipo_departamento)

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

app.post("/create_departamento",ensureToken,async function(req,res){
    try {
        var data = await DepartamentoController.insertDepartamentoController(req.body.code_departamento,
            req.body.num_piso, req.body.detalle_departamento, req.body.id_tipo_departamento,
            req.body.sector)

        res.status(200).json({
            status_code: data  ? 200 : 300,
            msm: data  ? 'Departamento creado con éxito' : 'No se ha podido crear el departamento' ,
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:'CODIGO DE DEPARTAMENTO NO DISPONIBLE'
        })
    }
})


app.put("/update_departamento",ensureToken,async function(req,res){
    try {
        var data = await DepartamentoController.updateDepartamentoController(req.body.detalle_departamento,
            req.body.id_tipo_departamento,req.body.num_piso,req.body.code_departamento)

        res.status(200).json({
            status_code: data  ? 200 : 300,
            msm: data  ? 'Departamento actualizado con éxito' : 'No se ha podido actualizar el departamento' ,
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})

app.delete("/delete_departamento",ensureToken,async function(req,res){
    try {
        var data = await DepartamentoController.deleteDepartamentoController(req.body.code_departamento)

        res.status(200).json({
            status_code: data  ? 200 : 300,
            msm: data  ? 'Departamento eliminado con éxito' : 'No se ha podido eliminar el departamento' ,
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})


module.exports = app