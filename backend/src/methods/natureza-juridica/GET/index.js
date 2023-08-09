const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getNaturezaJuridica(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemNaturezaJuridica() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                IDTabGeral,
                                Identificador,
                                CodIdentificador,
                                Descricao,
                                Texto,
                                Situacao
                            FROM TabGeral
                            WHERE Identificador = 'NATUREZA JURIDICA'`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemNaturezaJuridica()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Natureza Jurídica não encontrada" }
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