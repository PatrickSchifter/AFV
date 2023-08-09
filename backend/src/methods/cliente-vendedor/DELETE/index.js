const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function deleteClienteVendedor(req, res) {
    let dadosClienteVendedor = req.body.dados_cliente_vendedor

    const connection = await pool.connect();

    if(dadosClienteVendedor.IDClienteVendedor){
        try{
            async function deletarClienteVendedor() {
                return new Promise((resolve, reject) => {
                    let query=`DELETE FROM ClienteVendedor WHERE IDClienteVendedor=${dadosClienteVendedor.IDClienteVendedor}`
                    connection.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        } 
                        resolve(results);
                    });
                });
            }
            deletarClienteVendedor()
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
        return res.status(405).json({sucess: false, info: 'IDClienteVendedor não fornecido'})
    }
}