const express = require("express")
const app = express()
const ReporteController = require("../controller/reporte.controller")

app.post("/reporte1",async function(req,res)
{
    try {
        var data = await ReporteController.Report1Controller()

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


app.post("/reporte2",async function(req,res)
{
    try {
        var data = await ReporteController.Report2Controller(req.body.fechaI,req.body.fechaF)

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


app.post("/reporte_servicio",async function(req,res)
{
    try {
        var data = await ReporteController.ReporteReservaController(req.body.fechaI,req.body.fechaF)

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


app.post("/reporte_rubro",async function(req,res)
{
    try {
        var data = await ReporteController.ReporteRubroController(req.body.fechaI,req.body.fechaF,req.body.usuario)

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