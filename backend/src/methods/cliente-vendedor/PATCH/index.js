const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function updateClienteVendedor(req, res) {
    let data;
    let dadosCliente = req.body.dados_cliente_vendedor

    const connection = await pool.connect();

    function updateClienteVendedor() {
        return new Promise((resolve, reject) => {
            let query =    `UPDATE ClienteVendedor
                            SET 
                                IDUsuario = ${dadosCliente.IDUsuario},
                                TipoUsuario = '${dadosCliente.TipoUsuario}',
                                IDCascata = ${dadosCliente.IDCascata},
                                IDVolume = ${dadosCliente.IDVolume}
                            WHERE
                                IDClienteVendedor = ${dadosCliente.IDClienteVendedor}`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await updateClienteVendedor()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }