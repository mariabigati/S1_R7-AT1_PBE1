const {clienteModel} = require('../models/clienteModel');
const clienteController = {

    selecionaTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selectAllClientes;
            if (resultado.length === 0) {
                return res.status(200).json({message : 'Não foram encontrados resultados'});
            }
            res.status(200).json({data : resultado}); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    criaClientes: async (req, res) => {
        try {
            const {nome, cpf} = req.body;
            const resultado = await clienteModel.insertClientes(nome, cpf);
            if ( !nome || !cpf || !isNaN(nome) || isNaN(cpf)) {
                res.status(400).json({message: 'Verifique os dados enviados e tente novamente!'});
            }
            
            if (resultado.affectedRows === 0) {
                res.status(200).json({message: 'Houve um erro ao inserir dados do cliente. Tente novamente!'});
            }
            res.status(201).json({message: 'Dados do cliente inseridos com sucesso!', data: resultado}) 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    updateClientes: async () => {
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    deletaClientes: async () => {
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    }

}

module.exports = { clienteController };