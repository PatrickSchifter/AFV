const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getMarca(req, res) {
    let data;
    let response;
    const {idmarca} = req.query;

    const connection = await pool.connect();

    function obtemMarca() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                Marca.IDMarca,
                                Marca.Descricao,
                                Marca.CoDerp
                            FROM Marca `
            if(idmarca){
                query = query + 'WHERE ';
                if(idmarca){
                    query = query + `Marca.IDMarca=${idmarca} `
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

        await obtemMarca()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Marcas não encontradas." }
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