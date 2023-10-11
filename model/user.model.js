const connDB = require("../config/conn")
class UserModel
{
    static async loginModel(user,pass)
    {
        try {
            var conn = await connDB().promise()
            var data  = await conn.query("select U.email_usuario,U.nombre_usuario,U.fk_id_rol from usuario as U where " +
                "U.email_usuario = '"+user+"' and U.contrasenia = MD5('"+pass+"') and U.estado = 1")
            console.log(data)
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async createUsuarioModel(email_usuario, contrasenia, nombre_usuario, telefono_usuario,
                                    dni_usuario, id_rol,sexo_usuario)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into usuario(email_usuario, contrasenia, nombre_usuario, telefono_usuario, " +
                "dni_usuario, fk_id_rol,sexo_usuario) VALUES ('"+email_usuario+"',MD5('"+contrasenia+"'),'"+nombre_usuario+"','"+telefono_usuario+"','"+dni_usuario+"',"+id_rol+","+sexo_usuario+")"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async readAllUsuarioModel(rol)
    {
        try {
            var oSql = rol != "*" ? " and fk_id_rol = "+rol : ""

            var conn = await connDB().promise()
            var sql = "select U.email_usuario,U.nombre_usuario,U.telefono_usuario,U.dni_usuario," +
                "U.sexo_usuario,U.fk_id_rol,r.detalle from usuario as U inner join rol r on U.fk_id_rol = r.id_rol where U.estado = 1 "+oSql+" "
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async deleteUsuarioModel(usuario)
    {
        try{
            var conn = await connDB().promise()
            await conn.query("update usuario set estado = 0 where email_usuario = '"+usuario+"'")
            await conn.end()
        }catch (e) {
            console.log(e)
            return false
        }

        return true
    }

    static async updateUsuarioModel(email_usuario, contrasenia, nombre_usuario, telefono_usuario, dni_usuario, fk_id_rol)
    {
        try{
            var conn = await connDB().promise()
            var sql = "update usuario set nombre_usuario = '"+nombre_usuario+"'," +
                "telefono_usuario = '"+telefono_usuario+"', dni_usuario = '"+dni_usuario+"', " +
                "fk_id_rol = "+fk_id_rol+" where email_usuario = '"+email_usuario+"'"
            console.log(sql)
            await conn.query(sql)
            await conn.end()
        }catch (e) {
            console.log(e)
            return false
        }
        return true
    }

}

module.exports = UserModel