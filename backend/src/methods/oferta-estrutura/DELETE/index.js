const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function deletarOfertaEstrutura(req, res) {
    let dadosOfertaEstrutura = req.body.dados_oferta_estrutura

    const connection = await pool.connect();

    if(dadosOfertaEstrutura.IDOfertaEstrutura){
        try{
            async function deleteOfertaEstrutura() {
                return new Promise((resolve, reject) => {
                    let query=`DELETE FROM OfertaEstrutura WHERE IDOfertaEstrutura=${dadosOfertaEstrutura.IDOfertaEstrutura}`
                    connection.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        } 
                        resolve(results);
                    });
                });
            }
            deleteOfertaEstrutura()
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
        return res.status(405).json({sucess: false, info: 'IDOfertaEstrutura não fornecido'})
    }
}