const express = require('express');
const clienteRoutes = express.Router();
const { clienteController } = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.selecionaTodosClientes);
clienteRoutes.post('/clientes', clienteController.criaClientes);
clienteRoutes.put('/clientes/:idCliente', clienteController.alteraClientes);
clienteRoutes.delete('/clientes/:idCliente', clienteController.deletaClientes);

module.exports = { clienteRoutes };