const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getVClienteVendedorCombo(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemClienteVendedor() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                VClienteVendedorCombo.Nome,
                                VClienteVendedorCombo.IDViewUsuario,
                                VClienteVendedorCombo.IDUsuario,
                                VClienteVendedorCombo.TipoUsuario
                            FROM
                                VClienteVendedorCombo`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    await obtemClienteVendedor()
    .then((results) => {
        if (Object.keys(results.recordset).length === 0) {
            response = { sucess: false, "info": "Dados do Vendedor não encontrados." }
            return res.status(404).json(response)
        } else {
            data = results.recordset;
            response = { sucess: true, data: data }
            return res.status(200).json(response)
        }
    })
    .catch((error) => {
        return res.status(500).json({error:error})
    });

    connection.release();
}