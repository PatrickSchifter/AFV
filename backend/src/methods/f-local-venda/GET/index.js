const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getFotoLocalVenda(req, res) {
    let data;
    let response;
    const {idlocalvenda} = req.query;

    const connection = await pool.connect();

    function obtemLocalVenda() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                Foto,
                                IDLocalVenda
                            FROM
                                LocalVenda 
                            WHERE LocalVenda.IDLocalVenda=${idlocalvenda} `

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemLocalVenda()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Foto não encontrada." }
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