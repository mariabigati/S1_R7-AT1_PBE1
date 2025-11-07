const { clienteModel } = require('../models/clienteModel');
const clienteController = {

    selecionaTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selectAllClientes();
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'Não foram encontrados resultados' });
            }
            res.status(200).json({ data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    criaClientes: async (req, res) => {
        try {
            const { nome, cpf } = req.body;

            if (!nome || !cpf || !isNaN(nome) || isNaN(cpf)) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente!' });
            }
            const verifCpf = await clienteModel.selectCpf(cpf);
            if (verifCpf.length != 0) {
                return res.status(409).json({ message: 'CPF já foi registrado! Tente novamente!' });
            }
            const resultado = await clienteModel.insertClientes(nome, cpf);
            if (resultado.affectedRows === 0) {
                return res.status(200).json({ message: 'Houve um erro ao inserir dados do cliente. Tente novamente!' });
            }
            res.status(201).json({ message: 'Dados do cliente inseridos com sucesso!', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    alteraClientes: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            const { nome, cpf } = req.body;
            if (!idCliente || (!nome && !cpf) || !Number.isInteger(idCliente)) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente.' });
            };

            const verifCpf = await clienteModel.selectCpf(cpf);
            if (verifCpf.length != 0) {
                return res.status(409).json({ message: 'CPF já foi registrado! Tente novamente!' });
            };

            const clienteAtual = await clienteModel.selectIdCliente(idCliente);

            if (clienteAtual.length === 0) {
                return res.status(200).json({ message: 'Cliente não localizado!' });
            }

            const novoNome = nome ?? clienteAtual[0].nome_cliente;
            const novoCpf = cpf ?? clienteAtual[0].cpf_cliente;

            const resultadoUpdate = await clienteModel.updateClientes(novoNome, novoCpf, idCliente);
            if (resultadoUpdate.affectedRows === 1 && resultadoUpdate.changedRows === 0) {
                return res.status(200).json({ message: 'Não há alterações a se fazer.' });
            }
            if (resultadoUpdate.affectedRows === 1 && resultadoUpdate.changedRows === 1) {
                return res.status(200).json({ message: 'Registro alterado com sucesso!' });
            };

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    deletaClientes: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            if (!idCliente || !Number.isInteger(idCliente)) {
                return res.status(400).json({ message: 'Por favor forneça um identificador válido.' });
            }
            const clienteSelecionado = await clienteModel.selectIdCliente(idCliente);
            if (clienteSelecionado.length === 0) {
                return res.status(200).json({ message: 'Cliente não localizado!' });

            }
            const resultadoDelete = await clienteModel.deleteClientes(idCliente);
            if (resultadoDelete.affectedRows === 0) {
                return res.status(200).json({ message: 'Ocorreu um erro ao excluir os dados do cliente.' });
            }
            res.status(200).json({ message: 'Dados do cliente excluídos com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    }

}

module.exports = { clienteController };