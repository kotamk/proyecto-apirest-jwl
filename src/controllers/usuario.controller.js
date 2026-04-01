import models from '../models/index.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const findAll = async (req, res) => {
    try {
        let usuarios = await models.Usuario.findAll({
            attributes: ['id', 'nombre', 'apellido', 'status'],
        });

        usuarios = usuarios.map(u => {
            u = u.toJSON();
            u.url = "http://localhost:3000/api/usuarios/"+u.id
            return u;
        });
        console.log(usuarios);

        res.json({usuarios, message: "ok"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar obtener los datos."});
    }
};

const findById = async (req, res) => {
    try {
        
        let id = req.params.id;

        let usuario = await models.Usuario.findByPk(id, {
            attributes: { exclude: ['password'] },
        });

        if(!usuario) return res.status(404).json({message: "no existe un usuario con ese id"});

        res.json({usuario, message: "ok"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar obtener los datos."});
    }
};

const create = async (req, res) => {
    try {
        let { nombre, apellido, email, fecha_nacimiento, nickname, password } = req.body;
        let avatar = req.nombreImagen;
        
        let usuario = await models.Usuario.create({nombre, apellido, email, fecha_nacimiento, nickname, password, avatar});


        res.status(201).json({usuario, message: "Usuario creado con éxito."});

    } catch (error) {
        console.log(error);

        fs.unlinkSync(req.pathAvatar)

        res.status(500).json({message: "Error al intentar crear el usuario."});
    }
};

const changeEmail = async (req, res) => {
    try {
        let { email } = req.body;

        let dataUsuarioAuth = req.usuarioAuth;

        let usuario = await models.Usuario.findByPk(dataUsuarioAuth.id);

        console.log(usuario.email);

        if(!usuario) return res.status(404).json({message: "no existe un usuario con ese id"});

        if(usuario.email == email) return res.status(400).json({message: "Ha usado el mismo email ya registrado..."});

        usuario.email = email;
        await usuario.save();
        
        res.status(201).json({message: "Email actualizado con éxito."});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar crear el usuario."});
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        let usuario = await models.Usuario.findOne(
            {
                where: { email, password },
                attributes: { exclude: ['password'] },
            }
        );

        if(!usuario) return res.status(404).json({message: "Email y/o password incorrectos."});

        const token = jwt.sign({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            nickname: usuario.nickname,
            admin: usuario.admin
        }, process.env.SECRET_KEY, { expiresIn: '1h' })

        res.json({usuario, message: "Login correcto.", token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar crear el usuario."});
    }
};


const deleteUser = async (req, res) => {
    try {
        
        let id = req.params.id;

        //await models.Usuario.destroy({where: {id}});

        let usuario = await models.Usuario.findByPk(id);

        if(!usuario) return res.status(400).json({message: "El usuario ya no existe"});

        if(!usuario.status) return res.status(400).json({message: "El usario se encuentra inactivo"});

        usuario.status = false;

        await usuario.save();
        
        res.json({message: "La cuenta del usuario ha quedado inactiva."});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar eliminar la cuenta de usuario."});
    }
};


export default {
    findAll,
    create,
    login,
    findById,
    changeEmail,
    deleteUser
}
