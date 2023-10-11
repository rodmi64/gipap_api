const UserModel = require("../model/user.model")
class UserController
{
    static async loginController(user,pass){
        return await UserModel.loginModel(user,pass)
    }

    static async createUsuarioModel(email_usuario, contrasenia, nombre_usuario, telefono_usuario, dni_usuario, id_rol,sexo_usuario){
        return await UserModel.createUsuarioModel(email_usuario, contrasenia, nombre_usuario, telefono_usuario,
            dni_usuario, id_rol,sexo_usuario)
    }

    static async readAllUsuarioController(rol){
        return await UserModel.readAllUsuarioModel(rol)
    }

    static async deleteUsuarioController(usuario){
        return await UserModel.deleteUsuarioModel(usuario)
    }

    static async updateUsuarioController(email_usuario, contrasenia, nombre_usuario, telefono_usuario, dni_usuario,
                                    fk_id_rol)
    {
        return await UserModel.updateUsuarioModel(email_usuario, contrasenia, nombre_usuario, telefono_usuario, dni_usuario, fk_id_rol)
    }

}

module.exports = UserController