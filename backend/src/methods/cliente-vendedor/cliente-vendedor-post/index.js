const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function postClientePerfil(req, res) {
    let data;
    let response;
    let dadosCliente = req.body.dados_cliente

    const connection = await pool.connect();

    function gravaPrecoRegra() {
        return new Promise((resolve, reject) => {
            let query =    `INSERT INTO ClienteVendedor(
                                IDCliente, 
                                IDUsuario, 
                                TipoUsuario, 
                                IDCascata, 
                                IDVolume)
                            VALUES (
                                ${dadosCliente.IDCliente},
                                ${dadosCliente.IDUsuario},
                                '${dadosCliente.TipoUsuario}',
                                ${dadosCliente.IDCascata},
                                ${dadosCliente.IDVolume}
                                )`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await gravaPrecoRegra()
        .then((results) => {
            data = results
            return res.status(200).json({sucess: true, data: data})
        })
        .catch((error) => {
            return res.status(500).json({error:error})
        });

        connection.release();
}