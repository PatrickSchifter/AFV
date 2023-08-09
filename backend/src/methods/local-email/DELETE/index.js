const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function deleteLocalEmail(req, res) {
    let dadosLocalEmail = req.body.dados_local_email

    const connection = await pool.connect();

    if(dadosLocalEmail.IDLocalVenda && dadosLocalEmail.IDTipoEmail){
        try{
            async function deleteLocalEmail() {
                return new Promise((resolve, reject) => {
                    let query=`DELETE FROM LocalEmail WHERE IDLocal=${dadosLocalEmail.IDLocalVenda} AND IDTipoEmail=${dadosLocalEmail.IDTipoEmail}`
                    connection.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        } 
                        resolve(results);
                    });
                });
            }
            deleteLocalEmail()
            .then((results)=>{
                const data = results
                return res.status(200).json({sucess: true, data: data})
            }).catch((error) => {
                return res.status(500).json({error: error})
            });
        }catch(error){
            return res.status(500).json({error: error})
        } 
    }else{ 
        return res.status(405).json({sucess: false, info: 'IDLocalVenda e IDTipoEmail não fornecidos'})
    }
}