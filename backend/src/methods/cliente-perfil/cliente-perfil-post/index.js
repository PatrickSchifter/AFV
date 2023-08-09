const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function postClientePerfil(req, res) {
    let data;
    let response;
    let dadosCliente = req.body.dados_cliente

    const connection = await pool.connect();

    function gravaPrecoRegra() {
        return new Promise((resolve, reject) => {
            let query =    `UPDATE ClientePerfil
                            SET
                                ClientePerfil.LimiteCredito=${dadosCliente.LimiteCredito === null ? `NULL`: "'" + dadosCliente.LimiteCredito + "'"},
                                ClientePerfil.IDRegiao=${dadosCliente.IDRegiao},
                                ClientePerfil.IDTransportador=${dadosCliente.IDTransportador},
                                ClientePerfil.DescGeral=${dadosCliente.DescGeral === null ? `NULL`: "'" + dadosCliente.DescGeral + "'"}, 
                                ClientePerfil.IDPrecoRegra=${dadosCliente.IDPrecoRegra},
                                ClientePerfil.PedidoMinimo=${dadosCliente.PedidoMinimo === null ? `NULL`: "'" + dadosCliente.PedidoMinimo + "'"}, 
                                ClientePerfil.TipoCliente=${dadosCliente.TipoCliente},
                                ClientePerfil.GrupoEco=${dadosCliente.GrupoEco},
                                ClientePerfil.Rede=${dadosCliente.Rede},
                                ClientePerfil.IDTipoPedido=${dadosCliente.IDTipoPedido},
                                ClientePerfil.DesComposto=${dadosCliente.DesComposto === null ? `NULL`: "'" + dadosCliente.DesComposto + "'"}, 
                                ClientePerfil.PerDesconto=${dadosCliente.PerDesconto},
                                ClientePerfil.TipoFrete=${dadosCliente.TipoFrete},
                                ClientePerfil.PresencaComprador=${dadosCliente.PresencaComprador},
                                ClientePerfil.PrazoMedio=${dadosCliente.PrazoMedio}
                            WHERE
                                ClientePerfil.IDCliente = ${dadosCliente.IDCliente}`

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
            return res.json({sucess:true, data: data, status: 200})
        })
        .catch((error) => {
            return res.json({sucess:false, info: error, status: 500})
        });

        connection.release();

        
    }