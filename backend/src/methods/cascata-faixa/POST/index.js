const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function insertCascataFaixa(req, res) {
    let data;
    let dadosCascataFaixa = req.body.dados_cascata_faixa

    const connection = await pool.connect();

    function insertCascataFaixa() {
        return new Promise((resolve, reject) => {
            let query =`INSERT INTO CascataFaixa(
                            IDCascata,
                            Sigla,
                            PerMaximo,
                            TipoCascata
                        )
                        VALUES(
                            ${dadosCascataFaixa.IDCascata},
                            '${dadosCascataFaixa.Sigla.toUpperCase()}',
                            ${dadosCascataFaixa.PerMaximo},
                            '${dadosCascataFaixa.TipoCascata}'
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
        
        await insertCascataFaixa()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }