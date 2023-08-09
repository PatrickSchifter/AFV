const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function updateCascata(req, res) {
    let data;
    let dadosCascata = req.body.dados_cascata

    const connection = await pool.connect();

    function updateCascata() {
        return new Promise((resolve, reject) => {
            let query =    `UPDATE Cascata
                            SET 
                                DesCascata = '${dadosCascata.DesCascata}',
                                Situacao = '${dadosCascata.Situacao}'
                            WHERE
                                IDCascata = ${dadosCascata.IDCascata}`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await updateCascata()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }