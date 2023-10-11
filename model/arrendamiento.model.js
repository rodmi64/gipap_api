const connDB = require("../config/conn")
class ArrendamientoModel
{
    static async readArrendamientoModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select A.id_arrendamiento,A.fk_code_departamento,A.fk_email_usuario,U.nombre_usuario," +
                "convert(date(A.fecha_arrendamiento),char(150)) fecha_arrendamiento," +
                "convert(date(A.fecha_pago),char(150)) fecha_pago,A.detalle_arrendamiento,D.detalle_departamento,D.fk_id_tipo_departamento," +
                "TD.detalle_tipo_departamento,TD.precio_arriendo from arrendamiento as A inner join usuario as U " +
                "on U.email_usuario = A.fk_email_usuario inner join departamento as D on D.code_departamento = A.fk_code_departamento " +
                "inner join tipo_departamento as TD on TD.id_tipo_departamento = D.fk_id_tipo_departamento " +
                "where A.estado = 1"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async insertArrendamientoModel(usuario,departamento,fecha,detalle)
    {
        try {
            var conn = connDB().promise()
            var sql = "insert into arrendamiento(fk_email_usuario, fk_code_departamento, fecha_arrendamiento," +
                "fecha_pago, detalle_arrendamiento) VALUES ('"+usuario+"','"+departamento+"','"+fecha+"'," +
                "DATE_ADD(date('"+fecha+"'),interval 1 MONTH),'"+detalle+"')"
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }


    static async terminarArrendamientoModel(arrendamiento,detalle_desalojo)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update arrendamiento set fecha_desalojo = now(),detalle_desalojo='"+detalle_desalojo+"'," +
                "estado = 2 where id_arrendamiento = "+arrendamiento
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = ArrendamientoModel