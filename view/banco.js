require("../utils/jwt")
const express = require("express")
const app = express()
const {createToken, ensureToken} = require("../utils/jwt");
const BancoController = require("../controller/banco.controller");

app.get("/tipo_banco",async function(req,res)
{
    try {
        var data = await BancoController.readTipoBancoController()

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

app.post("/mis_cuentas",ensureToken,async function(req,res)
{
    try {
        var data = await BancoController.readMiCuentaBancariasController(req.body.data.CodiUsua)

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


app.post("/create_cuenta",ensureToken,async function(req,res)
{
    try {
        var data = await BancoController.insertCuentaBancoController(req.body.cuenta, req.body.data.CodiUsua, req.body.banco)

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