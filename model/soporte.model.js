const connDB = require("../config/conn")
class SoporteModel
{
    static async insertNuevoSoporteModel(fk_tipo_soporte, detalle_soporte, usuario_emisor_ticket,
                                         url_img, url_archivo, asunto_soporte)
    {
        try {
            var conn = await connDB().promise()
            /*var sql  = "insert into soporte(fk_tipo_soporte, detalle_soporte, usuario_emisor_ticket," +
                "url_img, url_archivo, asunto_soporte,fecha_apertura) values ("+fk_tipo_soporte+",'"+detalle_soporte+"'," +
                "'"+usuario_emisor_ticket+"','"+url_img+"','"+url_archivo+"','"+asunto_soporte+"',NOW())"*/
            var sql = `INSERT INTO soporte (fk_tipo_soporte, detalle_soporte, usuario_emisor_ticket,
              url_img, url_archivo, asunto_soporte, fecha_apertura)
              VALUES (${fk_tipo_soporte}, '${detalle_soporte}', '${usuario_emisor_ticket}',
              ${url_img !== null ? `'${url_img}'` : null}, ${url_archivo !== null ? `'${url_archivo}'` : null},
              '${asunto_soporte}', NOW())`

            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
        }
        return false
    }
    static async readAllTipoSoporteModel()
    {
        try {
            var conn = await connDB().promise()
            var data = await conn.query("select * from tipo_soporte where estado = 1")
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readAllSoporteModel(tipo_soporte,email_receptor,estado_soporte)
    {
        var mList = []
        var oSqlTipoSoporte = ""
        var oSqlEstadoSoporte = ""
        if(Array.isArray(tipo_soporte))
        {
            oSqlTipoSoporte = " where table1.fk_tipo_soporte in ("+tipo_soporte+") "
        }

        if(Array.isArray(estado_soporte))
        {
            oSqlEstadoSoporte = (oSqlTipoSoporte == "" ? " where " : " and ")+ " table1.estado in ("+estado_soporte+") "
        }

        try {
            var conn = await connDB().promise()
            var sql = "select * from  (select S.id_soporte,S.usuario_receptor_ticket,S.fk_tipo_soporte,convert(date(S.fecha_apertura),char(150)) fecha_apertura," +
                "convert((S.fecha_apertura),char(150)) fecha_apertura_,S.detalle_soporte," +
                "S.usuario_emisor_ticket,S.url_img,S.url_archivo,S.asunto_soporte,S.estado,U.nombre_usuario,U.telefono_usuario," +
                "TS.detalle_soporte as detalle_tipo_soporte from soporte as S inner join tipo_soporte as TS on " +
                "TS.id_tipo_soporte = S.fk_tipo_soporte inner join usuario as U on U.email_usuario = S.usuario_emisor_ticket " +
                "where S.estado in (1,2) ) table1 "+oSqlTipoSoporte+oSqlEstadoSoporte+ " order by fecha_apertura asc"
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()

            for (var i = 0;i<data[0].length;i++)
            {
                if(data[0][i].estado == 2)
                {
                    console.log(data[0][i].usuario_receptor_ticket +" == "+ email_receptor)
                    if(data[0][i].usuario_receptor_ticket == email_receptor)
                    {
                        mList.push(data[0][i])
                    }
                }else {
                    mList.push(data[0][i])
                }
            }

            return mList
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readAllSoporteUsuarioModel(tipo_soporte,email_receptor,estado_soporte)
    {

        var oSqlTipoSoporte = ""
        var oSqlEstadoSoporte = ""
        if(Array.isArray(tipo_soporte))
        {
            oSqlTipoSoporte = " where table1.fk_tipo_soporte in ("+tipo_soporte+") "
        }

        if(Array.isArray(estado_soporte))
        {
            oSqlEstadoSoporte = (oSqlTipoSoporte == "" ? " where " : " and ")+ " table1.estado in ("+estado_soporte+") "
        }

        try {
            var conn = await connDB().promise()
            var sql = "select * from  (select S.id_soporte,S.solucion_ticket,S.usuario_receptor_ticket,S.fk_tipo_soporte,convert(date(S.fecha_apertura),char(150)) fecha_apertura," +
                "convert((S.fecha_apertura),char(150)) fecha_apertura_,S.detalle_soporte," +
                "S.usuario_emisor_ticket,S.url_img,S.url_archivo,S.asunto_soporte,S.estado,U.nombre_usuario,U.telefono_usuario," +
                "TS.detalle_soporte as detalle_tipo_soporte from soporte as S inner join tipo_soporte as TS on " +
                "TS.id_tipo_soporte = S.fk_tipo_soporte inner join usuario as U on U.email_usuario = S.usuario_emisor_ticket " +
                "where S.usuario_emisor_ticket = '"+email_receptor+"' and S.estado != 0 ) table1 "+oSqlTipoSoporte+oSqlEstadoSoporte+ " order by fecha_apertura desc ,estado desc"
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()

            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async updateSoporteModel(id_soporte,usuario_receptor_ticket,solucion_ticket,estado)
    {
        var sql_fecha_solucion = ""
        if(estado == 3){
            sql_fecha_solucion = ",fecha_solucion = now() "
        }
        try {
            var conn = await connDB().promise()
            var sql = "update soporte set estado = "+estado+",solucion_ticket='"+solucion_ticket+"'"+sql_fecha_solucion+"," +
                "usuario_receptor_ticket='"+usuario_receptor_ticket+"' where id_soporte = "+id_soporte
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

module.exports = SoporteModel