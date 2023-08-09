const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getLinhaProduto(req, res) {
    let data;
    let response;
    const {idlinha} = req.query;

    const connection = await pool.connect();

    function obtemLinhaProduto() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                LinhaProduto.IDLinha,
                                LinhaProduto.DesLinha,
                                LinhaProduto.Estrutura,
                                LinhaProduto.Situacao
                            From LinhaProduto `
            if(idlinha){
                query = query + 'WHERE ';
                if(idlinha){
                    query = query + `LinhaProduto.IDLinha=${idlinha} `
                }
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemLinhaProduto()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Linhas não encontradas." }
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