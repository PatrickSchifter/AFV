const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClienteVendedorID(req, res) {
    let data;
    let response;
    let idCliente = req.params.id

    const connection = await pool.connect();

    function obtemClienteVendedor() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                ClienteVendedor.IDClienteVendedor,
                                ClienteVendedor.IDCliente,
                                ClienteVendedor.IDUsuario,
                                ClienteVendedor.TipoUsuario,
                                ClienteVendedor.IDCascata,
                                ClienteVendedor.IDVolume
                            FROM
                                ClienteVendedor `
            if(idCliente !== undefined){
                query = query +  `WHERE ClienteVendedor.IDCliente = '${idCliente}'
                                ORDER BY ClienteVendedor.IDCliente DESC;`
            }

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
                response = { sucess: false, "info": "Cliente Vendedor não encontrado" }
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