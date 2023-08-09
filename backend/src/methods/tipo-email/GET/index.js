const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getTipoEmail(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemTipoEmail() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                TabGeral.IDTabGeral,
                                TabGeral.CodIdentificador,
                                TabGeral.Descricao
                            FROM
                                TabGeral
                            WHERE
                                TabGeral.Identificador = 'TIPO EMAIL'
                            ORDER BY
                                TabGeral.Identificador `

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemTipoEmail()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Tipos de Emails não encontrados." }
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