const connDB = require("../config/conn")
class DepartamentoModel
{
    static async readAllDepartamentoOcupadoModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select code_departamento,detalle_departamento from departamento where estado = 2"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            return []
        }
    }

    static async readAllDepartamentoLibreModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select code_departamento,detalle_departamento from departamento where estado = 1"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            return []
        }
    }
    static async readTipoDepartamentoModel(){
        try {
            var conn = await connDB().promise()
            var sql = "select * from tipo_departamento where estado = 1"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readAllDepartamentoModel(tipo_departamento)
    {
        try {
            var oSqlTDepartamento = ""
            if(Array.isArray(tipo_departamento))
            {
                oSqlTDepartamento = " and D.fk_id_tipo_departamento in ("+tipo_departamento+") "
            }
            var conn = await connDB().promise()
            var sql = "select D.code_departamento,S.detalle as detalle_sector,D.num_piso,D.detalle_departamento,TD.id_tipo_departamento,TD.precio_arriendo,D.estado," +
                "D.actual_usuario_arrendador,TD.detalle_tipo_departamento,U.nombre_usuario,convert(D.fecha_arrendado,char(200)) fecha_arrendado from " +
                "departamento as D left join usuario as U on U.email_usuario = D.actual_usuario_arrendador left join tipo_departamento as TD on " +
                "D.fk_id_tipo_departamento = TD.id_tipo_departamento left join sector as S on S.code_sector = D.fk_sector  where D.estado != 0 "+oSqlTDepartamento
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async insertDepartamentoModel(code_departamento,num_piso, detalle_departamento,
                                         id_tipo_departamento,sector)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into departamento(code_departamento,num_piso, detalle_departamento, " +
                "fk_id_tipo_departamento,fk_sector) VALUES ('"+code_departamento+"',"+num_piso+",'"+detalle_departamento+"'," +
                ""+id_tipo_departamento+",'"+sector+"')"
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
        }
        return false
    }

    static async deleteDepartamentoModel(code_departamento)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update departamento set estado = 0 where code_departamento = '"+code_departamento+"'"
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async updateDepartamentoModel(detalle_departamento, id_tipo_departamento,num_piso,code_departamento)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update departamento set detalle_departamento = '"+detalle_departamento+"', " +
                "fk_id_tipo_departamento = "+id_tipo_departamento+",num_piso = "+num_piso+" where code_departamento = '"+code_departamento+"'"
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

module.exports = DepartamentoModel