const dotenv = require('dotenv');
dotenv.config();

// Enviroment Variables Config

   const enviroment = {

    port: process.env.PORT,
    url_database: process.env.MONGODB_ATLAS_URL
}

module.exports ={enviroment}