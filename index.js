import sequelize from './src/config/db.js';
import app from './src/app.js';
import 'dotenv/config';

import './src/models/index.js';

const init = async () => {
    try {
        await sequelize.sync({force: false, alter: false});

        app.listen(3000, () => {
            console.log("Servidor escuchando en http://localhost:3000") 
        });
        
    } catch (error) {
        console.log(error);
    }
};

init();