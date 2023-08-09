const UserController = require('../../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getCarimboIDCarimbo(req, res) {
    let data;
    let response;
    let idCarimbo = req.params.idcarimbo

    const connection = await pool.connect();

    function obtemCarimbo() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                IDCarimbo,
                                Descricao,
                                CarimboERP,
                                Situacao,
                                DescComplementar
                            FROM Carimbo `

            if(idCarimbo !== undefined){
                query = query +  `WHERE Carimbo.IDCarimbo = ${idCarimbo}`
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemCarimbo()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Carimbo não encontrado" }
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