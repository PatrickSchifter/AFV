const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function deleteCascataFaixa(req, res) {
    let dadosCascataFaixa = req.body.dados_cascata_faixa

    const connection = await pool.connect();

    if(dadosCascataFaixa.IDCascataFaixa){
        try{
            async function deleteCascataFaixa() {
                return new Promise((resolve, reject) => {
                    let query=`DELETE FROM CascataFaixa WHERE IDCascataFaixa=${dadosCascataFaixa.IDCascataFaixa}`
                    connection.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        } 
                        resolve(results);
                    });
                });
            }
            deleteCascataFaixa()
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
        return res.status(405).json({sucess: false, info: 'IDCascataFaixa não fornecido'})
    }
}