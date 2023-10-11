const express = require("express")
const app = express()
const SectorController = require("../controller/sector.controller")


app.get("/readSector",async function (req,res)
{
    try {
        var data = await SectorController.readSectorController()

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