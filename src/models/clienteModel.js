const { pool } = require('../config/db');
const clienteModel = {
    /**
     * @async
     * @function selectAllClientes
     * @returns {Promise<Array<object} Retorna um array de objetos, onde cada objeto representa um cliente.
     */
    selectAllClientes: async () => {
        const sql = 'SELECT * FROM clientes;'
        const [rows] = await pool.query(sql);
        return rows;
    },
    /**
     * @async
     * @function selectCpf
     * Seleciona o CPF do cliente na base de dados
     * @param {number} pCpfCliente CPF do cliente que será selecionado. EX: 12345678911
     * @returns {Promise<object} Retorna um objeto contendo as propriedades sobre o resultado da execução da Query
     */
    selectCpf: async (pCpfCliente) => {
        const sql = 'SELECT cpf_cliente FROM clientes WHERE cpf_cliente=?;';
        const values = [pCpfCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * @async
     * @function selectIdCliente
     * Seleciona um cliente na base de dados com base em seu ID.
     * @param {number} pIdCliente Identificador do cliente que será selecionado
     * @returns {Promise<object} Retorna um objeto contendo as propriedades sobre o resultado da execução da Query
     */
    selectIdCliente: async (pIdCliente) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente=?;'
        const values = [pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * @async
     * @function insertClientes
     * Insere um cliente na base de dados
     * @param {string} pNomeCliente Nome do cliente. EX: Ana
     * @param {number} pCpfCliente CPF do cliente. EX: 12345678911
     * @returns {Promise<object} Retorna um objeto contendo propriedades sobre o resultado da execução da Query
     */
    insertClientes: async (pNomeCliente, pCpfCliente) => {
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?);';
        const values = [pNomeCliente, pCpfCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * @async
     * @function updateClientes
     * Altera os dados do cliente selecionado
     * @param {number} pIdCliente Identificador do cliente que será alterado
     * @param {string} pNomeCliente Novo nome do cliente
     * @param {number} pCpfCliente Novo CPF do cliente
     * @returns {Promise<object}
     */
    updateClientes: async (pNomeCliente, pCpfCliente, pIdCliente) => {
        const sql = 'UPDATE clientes SET nome_cliente=?, cpf_cliente=? WHERE id_cliente=?;';
        const values = [pNomeCliente, pCpfCliente, pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;

    },
    /**
     * @async
     * @function deleteClientes
     * Deleta os dados do cliente da base de dados
     * @param {number} pIdCliente Identificador do cliente que será alterado
     * @returns {Promise<object}
     */
    deleteClientes: async (pIdCliente) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente=?;';
        const values = [pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;

    }

}

module.exports = { clienteModel };