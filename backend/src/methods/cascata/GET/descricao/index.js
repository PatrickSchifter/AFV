const UserController = require('../../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getCascataDescricao(req, res) {
    let data;
    let response;
    let descricao = req.params.descricao

    const connection = await pool.connect();

    function obtemCascata() {
        return new Promise((resolve, reject) => {
            let query =`SELECT
                            Cascata.DesCascata,
                            Cascata.IDCascata,
                            Cascata.Situacao
                        FROM
                            Cascata `
            if(descricao){
                query = query +     `WHERE Cascata.DesCascata LIKE '%${descricao}%'
                                    ORDER BY IDCascata DESC`
            }

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
                response = { sucess: false, "info": "Desconto não encontrado"}
                return res.status(404).json(response)
            } else {
                data = results.recordset;
                response = { sucess: true, data: data }
                return res.status(200).json(response)
            }
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }