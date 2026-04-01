import Usuario from './Usuario.model.js';
import Producto from './Producto.model.js';
import Venta from './Venta.model.js';
import DetalleVenta from './DetalleVenta.model.js';
import Carrito from './Carrito.model.js';


Usuario.hasMany(Venta, {
    foreignKey: 'id_usuario',
    as: "ventas"
});

Venta.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    as: "usuario"
});


//RELACIÓN 1 A MUCHOS ENTRE VENTA Y DETALLE_VENTA
Venta.hasMany(DetalleVenta, {
    foreignKey: "id_venta",
    as: "detalle"
});

DetalleVenta.belongsTo(Venta, {
    foreignKey: "id_venta",
    as: "venta"
});

//RELACIÓN 1 A MUCHOS ENTRE PRODUCTO Y DETALLE_VENTA
Producto.hasMany(DetalleVenta, {
    foreignKey: "id_producto",
    as: "detalle"
});

DetalleVenta.belongsTo(Producto, {
    foreignKey: "id_producto",
    as: "producto"
});


//RELACIÓN 1 A MUCHOS ENTRE CARRITO Y USUARIO
Usuario.hasMany(Carrito, {
    foreignKey: "id_usuario",
    as: "carrito"
});

Carrito.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    as: "usuario"
});

//RELACIÓN 1 A MUCHOS ENTRE CARRITO Y PRODUCTO

Producto.hasMany(Carrito, {
    foreignKey: "id_producto",
    as: "carrito"
});

Carrito.belongsTo(Producto, {
    foreignKey: "id_producto",
    as: "producto"
});



export default {
    Usuario,
    Producto,
    Venta,
    DetalleVenta,
    Carrito
};