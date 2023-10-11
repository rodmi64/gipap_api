const ArrendamientoModel = require("../model/arrendamiento.model")
class ArrendamientoController
{
    static async readArrendamientoController(){
        return await ArrendamientoModel.readArrendamientoModel()
    }

    static async insertArrendamientoController(usuario,departamento,fecha,detalle)
    {
        return await ArrendamientoModel.insertArrendamientoModel(usuario,departamento,fecha,detalle)
    }
    static async terminarArrendamientoController(arrendamiento,detalle_desalojo)
    {
        return await ArrendamientoModel.terminarArrendamientoModel(arrendamiento,detalle_desalojo)
    }
}

module.exports = ArrendamientoController