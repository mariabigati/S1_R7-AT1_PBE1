const { pool } = require('../config/db');
const clienteModel = {

    selectAllClientes: async ()=> {
        const sql = 'SELECT * FROM clientes;'
        const [rows] = await pool.query(sql);
        return rows;
    },

    insertClientes: async (pNomeCliente, pCpfCliente) => {
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?);';
        const values = [pNomeCliente, pCpfCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    updateClientes: async (pNomeCliente, pCpfCliente, pIdCliente) => {
        const sql = 'UPDATE clientes SET nome_cliente=?, cpf_cliente=? WHERE id_cliente=?;';
        const values = [pNomeCliente, pCpfCliente, pIdCliente]
        const [rows] = await pool.query(sql, values);
        return rows;

    },

    deleteClientes: async (pIdCliente) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente=?;';
        const values = [pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;

    }

}

module.exports = { clienteModel };