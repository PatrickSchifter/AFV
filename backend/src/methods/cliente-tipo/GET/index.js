const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClientePerfilID(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemClienteTipo() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                ClienteTipo.IDClienteTipo,
                                ClienteTipo.Descricao,
                                ClienteTipo.ClienteTipoERP,
                                ClienteTipo.Situacao
                            FROM
                                ClienteTipo`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemClienteTipo()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Dados do tipo do cliente não encontrados." }
                return res.status(404).json(response)
            } else {
                data = results.recordset;
                response = { sucess: true, data: data, status: 200 }
                return res.status(200).json(response)
            }
        })
        .catch((error) => {
            return res.status(500).json({error:error})
        });

        connection.release();
    }