const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getRede(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemRede() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                Rede.IDRede,
                                Rede.Descricao,
                                Rede.RedeERP,
                                Rede.Situacao
                            FROM
                                Rede`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    await obtemRede()
    .then((results) => {
        if (Object.keys(results.recordset).length === 0) {
            response = { sucess: false, "info": "Dados da Rede não encontrados." }
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