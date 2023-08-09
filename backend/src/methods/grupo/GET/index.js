const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getGrupo(req, res) {
    let data;
    let response;
    const {idgrupo} = req.query;

    const connection = await pool.connect();

    function obtemGrupo() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                Grupo.IDGrupo,
                                Grupo.Descricao,
                                Grupo.GrupoERP,
                                Grupo.Situacao
                            FROM Grupo `
            if(idgrupo){
                query = query + 'WHERE ';
                if(idgrupo){
                    query = query + `Grupo.IDGrupo=${idgrupo} `
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

        await obtemGrupo()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Grupo não encontrados." }
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