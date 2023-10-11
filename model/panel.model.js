const connDB = require("../config/conn")
class PanelModel
{
    static async readPanelAdminCardModel()
    {
        var mList = []
        try {
            var sqlUser = "SELECT SUM(CASE WHEN fk_id_rol = 2 THEN 1 ELSE 0 END) AS cont_clientes," +
                "SUM(CASE WHEN fk_id_rol = 3 THEN 1 ELSE 0 END) AS cont_service " +
                "FROM usuario WHERE estado = 1 AND fk_id_rol != 1;"
            var sqlDepa = "select  SUM(CASE WHEN estado = 2 THEN 1 ELSE 0 END) AS cont_arrendados," +
                "SUM(CASE WHEN estado = 1 THEN 1 ELSE 0 END) AS cont_libres from departamento where estado != 0"

            var sqlS = "select count(*) cont_service from reserva_servicio where estado_reserva = 2"

            var conn = await connDB().promise()
            var data1 = await conn.query(sqlUser)
            var data2 = await conn.query(sqlDepa)
            var data3 = await conn.query(sqlS)
            await conn.end()
            mList.push(data1[0][0])
            mList.push(data2[0][0])
            mList.push(data3[0][0])
        }catch (e) {
            console.log(e)
        }

        return mList
    }
}

module.exports = PanelModel