const express = require("express")
const app = express()
const PanelController = require("../controller/panel.controller")
const {ensureToken} = require("../utils/jwt");

app.post("/panel_Admin",ensureToken,async function(req,res)
{
    try {
        var data = await PanelController.readPanelAdminCardController()

        console.log(data)

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