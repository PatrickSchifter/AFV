const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getCategoria(req, res) {
    let data;
    let response;
    const {idcategoria} = req.query;

    const connection = await pool.connect();

    function obtemCategoria() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                Categoria.IDCategoria,
                                Categoria.Descricao,
                                Categoria.CategoriaERP,
                                Categoria.Situacao
                            FROM Categoria `
            if(idcategoria){
                query = query + 'WHERE ';
                if(idcategoria){
                    query = query + `Categoria.IDCategoria=${idcategoria} `
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

        await obtemCategoria()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Categorias não encontradas." }
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