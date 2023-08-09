const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getFabricante(req, res) {
    let data;
    let response;
    const {idfabricante} = req.query;

    const connection = await pool.connect();

    function obtemFabricante() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                Fabricante.IDFabricante,
                                Fabricante.Descricao,
                                Fabricante.CodERP
                            FROM Fabricante `
            if(idfabricante){
                query = query + 'WHERE ';
                if(idfabricante){
                    query = query + `Fabricante.IDFabricante=${idfabricante} `
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

        await obtemFabricante()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Fabricantes não encontrados." }
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