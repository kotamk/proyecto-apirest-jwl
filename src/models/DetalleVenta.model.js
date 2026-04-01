import { Model, DataTypes } from "sequelize";
import sequelize from '../config/db.js';

class DetalleVenta extends Model {}

DetalleVenta.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_venta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "ventas",
                key: "id",
            },
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "productos",
                key: "id",
            },
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },
        precio: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false,
            validate: {
                isDecimal: true,
                min: 1,
            },
        },
    },
    {
        sequelize, // Instancia de conexión
        modelName: "DetalleVenta",
        tableName: "detalle_ventas",
        timestamps: false,
    },
);

export default DetalleVenta;
