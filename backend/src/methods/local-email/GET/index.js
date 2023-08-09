const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getLocalEmail(req, res) {
    let data;
    let response;
    const {idlocalvenda, idtipoemail} = req.query;

    const connection = await pool.connect();

    function obtemLocalEmail() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                LocalEmail.IDLocal,
                                LocalEmail.EmailResposta,
                                LocalEmail.Assunto,
                                LocalEmail.Corpo,
                                LocalEmail.Assinatura,
                                LocalEmail.IDTipoEmail
                            FROM
                                LocalEmail `
            if(idlocalvenda || idtipoemail){
                query = query + `WHERE `
                if(idlocalvenda){
                    query = query + `LocalEmail.IDLocal=${idlocalvenda} `
                }
                if(idlocalvenda && idtipoemail){
                    query = query + 'AND '
                }
                if(idtipoemail){
                    query = query + `LocalEmail.IDTipoEmail=${idtipoemail} `
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

        await obtemLocalEmail()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Email não encontrados."}
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