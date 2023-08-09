const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function updateOferta(req, res) {
    let data;
    let dadosOferta = req.body.dados_oferta

    const connection = await pool.connect();

    function updateOferta() {
        return new Promise((resolve, reject) => {
            let query =`UPDATE 
                            Oferta
                        SET 
                            Descricao = '${dadosOferta.Descricao}',
                            DtInicial = '${dadosOferta.DtInicial}',
                            DtFinal = '${dadosOferta.DtFinal}'
                        WHERE 
                            IDOferta = ${dadosOferta.IDOferta} `

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await updateOferta()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }