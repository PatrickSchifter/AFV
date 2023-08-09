const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClientePerfilID(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemGrupoEconomico() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                GrupoEconomico.IDGrupoEconomico,
                                GrupoEconomico.Descricao,
                                GrupoEconomico.GrupoEconomicoERP,
                                GrupoEconomico.Situacao
                            FROM
                                GrupoEconomico`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemGrupoEconomico()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Dados do Grupo Econômico não encontrados."}
                return res.status(403).json(response)
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