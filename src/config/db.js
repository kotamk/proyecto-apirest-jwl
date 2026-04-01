import { Sequelize } from "sequelize";

const sequelize = new Sequelize("m8_portafolio_db", "node", "123456", {
    host: "localhost",
    port: 5433,
    dialect: "postgres",
    pool: {
        idle: 10000,
    },
});

export default sequelize;
