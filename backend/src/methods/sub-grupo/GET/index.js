const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getSubGrupo(req, res) {
    let data;
    let response;
    const {idsubgrupo} = req.query;

    const connection = await pool.connect();

    function obtemSubGrupo() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                SubGrupo.IDSubGrupo,
                                SubGrupo.Descricao,
                                SubGrupo.SubGrupoERP,
                                SubGrupo.Situacao
                            FROM SubGrupo `
            if(idsubgrupo){
                query = query + 'WHERE ';
                if(idsubgrupo){
                    query = query + `SubGrupo.IDSubGrupo=${idsubgrupo} `
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

        await obtemSubGrupo ()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Sub Grupo não encontrados." }
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