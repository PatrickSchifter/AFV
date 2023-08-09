const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function insertOferta(req, res) {
    let data;
    let dadosOferta = req.body.dados_oferta

    const connection = await pool.connect();

    function insertOferta() {
        return new Promise((resolve, reject) => {
            let query =`INSERT INTO Oferta(
                            Descricao,
                            DtInicial,
                            DtFinal
                        )
                        VALUES(
                            '${dadosOferta.Descricao}',
                            '${dadosOferta.DtInicial}',
                            '${dadosOferta.DtFinal}'
                        );
                        SELECT MAX(IDOferta) AS IDOferta FROM Oferta;`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await insertOferta()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }