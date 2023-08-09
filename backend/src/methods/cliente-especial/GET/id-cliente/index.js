const UserController = require('../../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClienteEspecialID(req, res) {
    let data;
    let response;
    let idCliente = req.params.idcliente

    const connection = await pool.connect();

    function obtemClienteFiscal() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                ClienteEspecial.IDCliente,
                                ClienteEspecial.RegSuframa,
                                CONVERT(varchar, ClienteEspecial.DataRegSuframa,103) as DataRegSuframa,
                                CONVERT(varchar, ClienteEspecial.DataValSuframa,103) as DataValSuframa,
                                ClienteEspecial.RegTare,
                                CONVERT(varchar, ClienteEspecial.DataRegTare,103) as DataRegTare,
                                CONVERT(varchar, ClienteEspecial.DataValTare,103) as DataValTare,
                                ClienteEspecial.Carimbo,
                                ClienteEspecial.DescricaoCarimbo
                            FROM
                            ClienteEspecial `

            if(idCliente !== undefined){
                query = query +  `WHERE ClienteEspecial.IDCliente = ${idCliente}`
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemClienteFiscal()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Cliente Fiscal não encontrado" }
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