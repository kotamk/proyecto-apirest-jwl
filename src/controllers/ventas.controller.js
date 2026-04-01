import models from "../models/index.js";
import sequelize from "../config/db.js";

const create = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id_usuario } = req.params;

        // 1. BUSCAR ÍTEMS DEL CARRITO
        const carritoItems = await models.Carrito.findAll({
            where: { id_usuario },
            transaction: t,
        });

        // findAll devuelve un array vacío [] si no hay resultados, no null
        if (carritoItems.length === 0) {
            await t.rollback();
            return res.status(400).json({ 
                message: "No existe un carrito activo para este usuario." 
            });
        }

        // 2. REGISTRAR CABECERA DE VENTA
        const venta = await models.Venta.create(
            { id_usuario },
            { transaction: t }
        );

        // 3. PROCESAR DETALLES (Usamos for...of para manejar async/await correctamente)
        for (const item of carritoItems) {
            const producto = await models.Producto.findByPk(item.id_producto, {
                transaction: t,
                lock: t.LOCK.UPDATE // Bloqueo para evitar que otro proceso cambie el stock simultáneamente
            });

            if (!producto || producto.stock < item.cantidad) {
                throw new Error(`Stock insuficiente para el producto: ${producto?.nombre || item.id_producto}`);
            }

            // DESCONTAR STOCK
            await producto.decrement('stock', { 
                by: item.cantidad, 
                transaction: t 
            });

            // CREAR DETALLE DE VENTA
            await models.DetalleVenta.create({
                id_venta: venta.id,
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio: Number(producto.precio), // Usamos el precio actual del producto
            }, { transaction: t });
        }

        // 4. LIMPIAR CARRITO DEL USUARIO
        await models.Carrito.destroy({
            where: { id_usuario }, // Borramos todos los ítems de ese usuario
            transaction: t
        });

        await t.commit();

        return res.status(201).json({
            message: "Venta creada con éxito",
            id_venta: venta.id
        });

    } catch (error) {
        await t.rollback();
        console.error("Error en transacción de venta:", error);
        
        return res.status(500).json({
            message: error.message || "Error interno al procesar la venta",
        });
    }
};

export default {
    create,
};
