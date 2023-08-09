const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function insertCascata(req, res) {
    let data;
    let dadosCascata = req.body.dados_cascata

    const connection = await pool.connect();

    function insertCascata() {
        return new Promise((resolve, reject) => {
            let query =`INSERT INTO Cascata(
                            DesCascata,
                            Situacao
                        )
                        VALUES(
                            '${dadosCascata.DesCascata.toUpperCase()}',
                            '${dadosCascata.Situacao}'
                        );
                        SELECT MAX(IDCascata) AS IDCascata FROM Cascata;`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await insertCascata()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }