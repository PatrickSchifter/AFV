const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function updateLocalEmail(req, res) {
    let data;
    let dadosLocalEmail = req.body.dados_local_email;

    const connection = await pool.connect();

    function updateLocalEmail() {
        return new Promise((resolve, reject) => {
            let query =`UPDATE LocalEmail
                        SET
                            IDTipoEmail   =  ${dadosLocalEmail.IDTipoEmail},
                            EmailResposta = '${dadosLocalEmail.EmailResposta}',
                            Assunto       = '${dadosLocalEmail.Assunto}',
                            Corpo         = '${dadosLocalEmail.Corpo}',
                            Assinatura    = '${dadosLocalEmail.Assinatura}'
                        WHERE 
                            IDLocal  =  ${dadosLocalEmail.IDLocalVenda} AND
                            IDTipoEmail   =  ${dadosLocalEmail.IDTipoEmailAntigo}`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }
        
    await updateLocalEmail()
    .then((results) => {
        data = results
        return res.status(201).json({sucess: true , data: data})
    })
    .catch((error) => {
        return res.status(500).json({error: error})
    });

    connection.release();
}