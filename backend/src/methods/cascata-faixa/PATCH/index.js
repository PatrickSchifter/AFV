const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function updateCascataFaixa(req, res) {
    let data;
    let dadosCascataFaixa = req.body.dados_cascata_faixa

    const connection = await pool.connect();

    function updateCascataFaixa() {
        return new Promise((resolve, reject) => {
            let query =    `UPDATE CascataFaixa
                            SET 
                                CascataFaixa.TipoCascata = '${dadosCascataFaixa.TipoCascata}'
                            WHERE
                                CascataFaixa.IDCascataFaixa = ${dadosCascataFaixa.IDCascataFaixa}`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await updateCascataFaixa()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }