const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function postClienteVisita(req, res) {
    let dadosClienteVisita = req.body.dados_cliente_visita

    const connection = await pool.connect();

    if(dadosClienteVisita.IDClienteVendedor){
        try{
            async function alterarClienteVisita() {
                return new Promise((resolve, reject) => {
                    let query=`DELETE FROM ClienteVisita WHERE IDClienteVendedor=${dadosClienteVisita.IDClienteVendedor}`
                    connection.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        } 
                        resolve(results);
                        return res.status(200).json({sucess: true})
                    });
                });
            }
            alterarClienteVisita();
        }catch(error){
            return res.status(500).json({error:error})
        }
    }else{ 
        return res.status(405).json({sucess: false, info: 'IDClienteVendedor não fornecido'})
    }
}