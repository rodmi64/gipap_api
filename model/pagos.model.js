const connDB = require("../config/conn")
class PagosModel
{
    static async readPagoAdminModel(fechaI,fechaF,code_depa,recibo,tipo)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select table1.*,concat(table1.fk_cuenta_banco,' ',B.detalle_banco) BancoEmisor " +
                "from (select PD.id_pago_departamento,PD.fk_cuenta_banco,PD.detalle_comprobante,PD.fk_code_departamento," +
                "convert(date(PD.fecha_creacion),char(150)) fecha_creacion,PD.motivo,PD.code_referencia, " +
                "PD.foto_url_deposito,PD.fk_email_usuario,U.nombre_usuario,U.telefono_usuario,PD.estado, " +
                "TD.detalle_tipo_departamento,TD.precio_arriendo from pago_departamento as PD inner join " +
                "usuario as U on U.email_usuario = PD.fk_email_usuario inner join departamento as D on " +
                "PD.fk_code_departamento = D.code_departamento inner join tipo_departamento as TD on " +
                "TD.id_tipo_departamento = D.fk_id_tipo_departamento where PD.estado !=3) as table1 " +
                "left join cuenta_bancaria as CB on CB.num_cuenta_bancaria = table1.fk_cuenta_banco " +
                "and CB.fk_email_usuario = table1.fk_email_usuario left join banco as B on B.id_banco = CB.fk_banco " +
                "order by fecha_creacion desc;"
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readPagoUsuarioModel(fechaI,fechaF,tipo,usuario)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select PD.id_pago_departamento,PD.detalle_comprobante,PD.fk_code_departamento,'' BancoEmisor,convert(date(PD.fecha_creacion),char(150)) fecha_creacion,PD.motivo,PD.code_referencia,PD.foto_url_deposito," +
                "PD.fk_email_usuario,U.nombre_usuario,U.telefono_usuario,PD.estado,TD.detalle_tipo_departamento," +
                "TD.precio_arriendo from pago_departamento as PD inner join usuario as U on " +
                "U.email_usuario = PD.fk_email_usuario inner join departamento as D on " +
                "PD.fk_code_departamento = D.code_departamento inner join tipo_departamento as TD on " +
                "TD.id_tipo_departamento = D.fk_id_tipo_departamento where U.email_usuario = '"+usuario+"' order by PD.fecha_creacion desc;"
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async pagoArreindoAdminModel(id_pago_departamento_,estado_,detalle)
    {
        try {
            var detalle2 = detalle == null  ? '' : detalle
            var conn = await connDB().promise()
            await conn.query("update pago_departamento set estado = "+estado_+",detalle_comprobante = '"+detalle2+"' where id_pago_departamento = "+id_pago_departamento_)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }


    static async sendReciboPagoModel(foto,cuenta,id_pago)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update pago_departamento set foto_url_deposito = '"+foto+"'," +
                "estado = 2,fk_cuenta_banco = '"+cuenta+"' where id_pago_departamento = "+id_pago
            await conn.query(sql)
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = PagosModel