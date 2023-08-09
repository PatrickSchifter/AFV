const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getVClienteVendedorLinha(req, res) {
    let data;
    let response;
    let idCliente = req.params.idcliente

    const connection = await pool.connect();

    function obtemVClienteVendedorLinha() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                VClienteVendedorLinha.IDCliente,
                                VClienteVendedorLinha.Nome,
                                VClienteVendedorLinha.IDUsuario,
                                VClienteVendedorLinha.CodERP,
                                VClienteVendedorLinha.DesLinha,
                                VClienteVendedorLinha.DesEquipe,
                                VClienteVendedorLinha.IDCascata,
                                VClienteVendedorLinha.DesCascata,
                                VClienteVendedorLinha.TipoUsuario,
                                VClienteVendedorLinha.IDClienteVendedor,
                                VClienteVendedorLinha.DesVolume,
                                VClienteVendedorLinha.IDVolume
                            FROM
                                VClienteVendedorLinha `
            if(idCliente !== undefined){
                query = query +  `WHERE VClienteVendedorLinha.IDCliente = ${idCliente}
                                    ORDER BY
                                    VClienteVendedorLinha.IDClienteVendedor;`
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    await obtemVClienteVendedorLinha()
    .then((results) => {
        if (Object.keys(results.recordset).length === 0) {
            response = { sucess: false, "info": "Cliente Vendedor não encontrado" , status: 404}
            return res.status(200).json(response)
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