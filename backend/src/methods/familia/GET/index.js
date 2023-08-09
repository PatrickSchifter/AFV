const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getFamilia(req, res) {
    let data;
    let response;
    const {idfamilia} = req.query;

    const connection = await pool.connect();

    function obtemFamilia() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                Familia.IDFamilia,
                                Familia.Descricao,
                                Familia.FamiliaERP,
                                Familia.Situacao
                            FROM Familia `
            if(idfamilia){
                query = query + 'WHERE ';
                if(idfamilia){
                    query = query + `Familia.IDFamilia=${idfamilia} `
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
                response = { sucess: false, "info": "Familias não encontradas." }
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