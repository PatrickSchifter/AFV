const UserController = require('../../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClienteContato(req, res) {
    let data;
    let response;
    let idCliente = req.params.idcliente

    const connection = await pool.connect();

    function obtemClienteContato() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                IDContato,
                                IDCliente,
                                Nome,
                                CONVERT(varchar, ClienteContato.DataNascimento,103) as DataNascimento,
                                Funcao,
                                Departamento,
                                TelFixo,
                                TelCelular,
                                NumWhats,
                                EmailCorp,
                                PedidoCorp,
                                EmailPessoal,
                                PedidoPessoal,
                                Situacao
                            FROM ClienteContato `
            if(idCliente !== undefined){
                query = query +  `WHERE ClienteContato.IDCliente = ${idCliente}
                                  ORDER BY [IDContato] DESC`
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemClienteContato()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Cliente Contato não encontrado" }
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