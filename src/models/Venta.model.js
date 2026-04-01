import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from '../config/db.js';

class Venta extends Model {}

Venta.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "usuarios", // Nombre de la tabla de destino
                key: "id", // Columna de destino
            },
        },
    },
    {
        sequelize, // Instancia de la conexión
        modelName: "Venta",
        tableName: "ventas",
        timestamps: false, // Se desactiva si no usas createdAt/updatedAt
    },
);

export default Venta;
