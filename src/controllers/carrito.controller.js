import models from '../models/index.js';


const cantidad = async (req, res) => {
    try {

        let id_usuario = req.params.id_usuario;
        
        let carrito = await models.Carrito.findAll({where : {
            id_usuario
        }});

        let cantidad = 0;
        if(carrito){
            carrito = carrito.map(c=> c.toJSON());

            cantidad = carrito.reduce((a, b) => a+ b.cantidad, 0);
        }

        res.json({cantidad});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar agregar el producto al carrito."});
    }
};

const addProduct = async (req, res) => {
    try {

        let { id_usuario, id_producto} = req.params; 

        let carrito = await models.Carrito.findOne({where: {
            id_usuario, id_producto
        }});

        if(carrito){
            carrito.cantidad = carrito.cantidad+1;
            carrito.save();

            return res.status(201).json({message: "Se agregó correctamente el producto."});
        }
        
        carrito = await models.Carrito.create({id_usuario, id_producto, cantidad:1});

        return res.status(201).json({message: "Se agregó un nuevo producto a su carrito."})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar agregar el producto al carrito."});
    }
};


const deleteProduct = async (req, res) => {
    try {

        let { id } = req.params;

        await models.Carrito.destroy({where: {id}});

        return res.status(200).json({message: "Se eliminó correctamente el producto del detalle."});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar elimianar el produvto."});
    }
};

export default {
    addProduct,
    cantidad,
    deleteProduct
}

