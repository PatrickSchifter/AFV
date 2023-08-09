const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function insertLocalEmail(req, res) {
    let data;
    let dadosLocalEmail = req.body.dados_local_email

    const connection = await pool.connect();

    function inserirLocalEmail() {
        return new Promise((resolve, reject) => {
            let query =`INSERT INTO LocalEmail(
                            IDLocal,
                            IDTipoEmail,
                            EmailResposta,
                            Assunto,
                            Corpo,
                            Assinatura
                        )VALUES(
                            ${dadosLocalEmail.IDLocalVenda},
                            ${dadosLocalEmail.IDTipoEmail},
                            '${dadosLocalEmail.EmailResposta}',
                            '${dadosLocalEmail.Assunto}',
                            '${dadosLocalEmail.Corpo}',
                            '${dadosLocalEmail.Assinatura}'
                        );`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await inserirLocalEmail()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }