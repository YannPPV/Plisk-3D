const express = require('express');
const swaggerUi = require('swagger-ui-express');
// cors permet au navigateur d'autoriser les requêtes cross-origin
const cors = require('cors');
const swaggerSpec = require('./src/config/swagger');

// dotenv charge les variables du fichier .env
require('dotenv').config();

const app = express(); // La création de l'app
const PORT = process.env.PORT || 3000;
// numéro de port sur lequel le serveur va écouter, on le lit dans le .env et siono 300 par défaut.

//  lis le contenue des requetes
app.use(express.json());

app.use(cors()); // autorise Vue.js (port 5173) à contacter Express (port 3000)

const productsRouter = require('./src/routes/products');

app.use('/api/products', productsRouter);

// Route documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Lance le serveur sur le port 3000
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Exporte l'app pour pouvoir l'utiliser dans d'autres fichiers
module.exports = app;
