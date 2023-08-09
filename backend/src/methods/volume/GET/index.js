const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getVolume(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemVolume() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                Volume.IDVolume,
                                Volume.DesVolume,
                                Volume.DataInicial,
                                Volume.DataFinal,
                                Volume.Situacao
                            FROM
                                Volume`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemVolume()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Dados do desconto por volume não encontrados." }
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