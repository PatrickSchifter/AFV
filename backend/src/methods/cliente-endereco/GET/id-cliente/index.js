const UserController = require('../../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClienteEndereco(req, res) {
    let data;
    let response;
    let idCliente = req.params.idcliente

    const connection = await pool.connect();

    function obtemClienteEndereco() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                IDEndereco,
                                IDCliente,
                                CEP,
                                Logradouro,
                                Numero,
                                Complemento,
                                Bairro,
                                CodIBGE,
                                TipoEndereco,
                                Situacao
                            FROM ClienteEndereco `
            if(idCliente !== undefined){
                query = query +  `WHERE ClienteEndereco.IDCliente = ${idCliente}`
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemClienteEndereco()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Cliente Endereço não encontrado" }
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