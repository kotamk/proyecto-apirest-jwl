import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Producto extends Model { }

Producto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        precio: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 9999999,
            validate: {
                min: 1,  
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,  
            }
        },
        imagen: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "https://placehold.co/600x400",
        }
    },
    {
        sequelize,
        modelName: 'Producto',
        tableName: 'productos',
        timestamps: false
    },
);


export default Producto;