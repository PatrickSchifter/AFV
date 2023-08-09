const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getCascata(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemCascata() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                Cascata.DesCascata,
                                Cascata.IDCascata,
                                Cascata.Situacao
                            FROM
                                Cascata`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemCascata()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Dados do desconto cascata não encontrados.", status: 404}
                return res.status(500).json(response)
            } else {
                data = results.recordset;
                response = { sucess: true, data: data , status: 200}
                return res.status(200).json(response)
            }
        })
        .catch((error) => {
            return res.status(500).json({error: error});
        });

        connection.release();
    }