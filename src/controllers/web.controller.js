import models from "../models/index.js";
import db from "../config/db.js";
import { QueryTypes, Op, where } from "sequelize";

const home = async (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al intentar cargar la vista." });
    }
};

const usuarios = async (req, res) => {
    try {
        res.render("usuarios");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al intentar cargar la vista." });
    }
};

const register = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al intentar cargar la vista." });
    }
};

const login = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al intentar cargar la vista." });
    }
};

const perfil = async (req, res) => {
    let id = req.params.id;
    let userViewer = req.usuarioAuth;

    let allowEdit = id == userViewer.id;

    try {
        let usuario = await models.Usuario.findByPk(id, {
            attributes: { exclude: ["password"] },
        });

        res.render("perfil", {
            usuario: usuario.toJSON(),
            userViewer,
            allowEdit
        });
    } catch (error) {
        console.log(error);

        res.render("perfil", {
            error: "No existe ningún usuario con el id: " + id,
        });
    }
};

const productos = async (req, res) => {
    try {
        let { producto } = req.query;

        let listaProductos = [];
        if (producto) {
            producto = producto.toLowerCase();

            // listaProductos = await db.query('select * from productos where nombre ilike ?', {
            //     replacements: [`%${producto}%`],
            //     type: QueryTypes.SELECT,
            // });

            listaProductos = await models.Producto.findAll({
                where: {
                    nombre: {
                        [Op.iLike]: `%${producto}%`,
                    },
                },
            });

        } else {
            listaProductos = await models.Producto.findAll();
        }

        listaProductos = listaProductos.map((p) => p.toJSON());
        res.render("productos", {
            productos: listaProductos,
        });
    } catch (error) {
        console.log(error);

        res.render("productos", {
            error: "Error al intentar leer los productos, intente más tarde...",
        });
    }
};


const ventas = async (req, res) => {
    try {

        let ventas = await models.Venta.findAll({
            include: [
                {
                    model: models.Usuario,
                    as: 'usuario',
                    attributes: {exclude: ['password', 'fecha_nacimiento', 'admin']}
                },
                {
                    model: models.DetalleVenta,
                    as: 'detalle',
                    include: [
                        {
                            model: models.Producto,
                            as: 'producto'
                        }
                    ]
                }
            ]
        });

        ventas = ventas.map((v) => {
            v = v.toJSON();

            const objFormateado = {
                id_venta: v.id,
                fecha: v.fecha,
                usuario: `${v.usuario.nombre} ${v.usuario.apellido}`,
                email: v.usuario.email,
                detalle: v.detalle.map(d => {
                    return {
                        id_detalle: d.id,
                        producto: d.producto.nombre,
                        cantidad: d.cantidad,
                        precio: Number(d.precio).toLocaleString("es-CL"),
                        subtotal: d.cantidad * Number(d.precio),
                        subtotalStr: (d.cantidad * Number(d.precio)).toLocaleString("es-CL"),
                    }
                })
            }
            console.log(objFormateado)

            objFormateado.total = (objFormateado.detalle.reduce((accumulator, currentValue) => accumulator + currentValue.subtotal, 0)).toLocaleString("es-CL");

            return objFormateado;
        });


        res.render("ventas", {
            ventas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al intentar cargar la vista." });
    }
};

const carrito = async (req, res) => {
    try {
        let id = req.params.id;

        let carrito = await models.Carrito.findAll({
            where: {
                id_usuario: id
            },
            include: [
                {
                    model: models.Producto,
                    as: "producto"
                }
            ]
        });

        carrito = carrito.map(c => {
            c = c.toJSON();

            c.subtotal = c.cantidad * c.producto.precio;

            return c
        });

        let total = carrito.reduce((a, b) => a + b.subtotal, 0);
        
        console.log(carrito);

        res.render("carrito", {
            carrito,
            total
        });
    } catch (error) {
        console.log(error);
        res.render("carrito", {
            error: "Error al intentar obtener los datos del carrito."
        });
    }
};


export default {
    register,
    login,
    home,
    usuarios,
    perfil,
    productos,
    ventas,
    carrito
    
};
