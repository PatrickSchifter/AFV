const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getGrandeGrupo(req, res) {
    let data;
    let response;
    const {idgrupo} = req.query;

    const connection = await pool.connect();

    function obtemFamilia() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                GrandeGrupo.IDGrandeGrupo,
                                GrandeGrupo.Descricao,
                                GrandeGrupo.GrandeGrupoERP,
                                GrandeGrupo.Situacao
                            FROM GrandeGrupo `
            if(idgrupo){
                query = query + 'WHERE ';
                if(idgrupo){
                    query = query + `GrandeGrupo.IDGrandeGrupo=${idgrupo} `
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

        await obtemFamilia()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Grande Grupo não encontrados." }
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