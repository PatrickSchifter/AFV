const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClientePerfilID(req, res) {
    let data;
    let response;
    let IDCliente = req.params.idcliente

    const connection = await pool.connect();

    function obtemPrecoRegra() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                ClientePerfil.IDCliente,
                                ClientePerfil.LimiteCredito,
                                ClientePerfil.IDRegiao,
                                ClientePerfil.IDTransportador,
                                ClientePerfil.DescGeral,
                                ClientePerfil.IDPrecoRegra,
                                ClientePerfil.PedidoMinimo,
                                ClientePerfil.TipoCliente,
                                ClientePerfil.GrupoEco,
                                ClientePerfil.Rede,
                                ClientePerfil.IDTipoPedido,
                                ClientePerfil.DesComposto,
                                ClientePerfil.PerDesconto,
                                ClientePerfil.TipoFrete,
                                ClientePerfil.PresencaComprador,
                                ClientePerfil.PrazoMedio
                            From
                                ClientePerfil
                            Where
                                ClientePerfil.IDCliente = ${IDCliente}`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemPrecoRegra()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Dados do perfil do cliente não encontrados." }
                return res.status(404).json(response)
            } else {
                data = results.recordset;
                response = { sucess: true, data: data }
                return res.status(200).json(response)
            }
        })
        .catch((error) => {
            return res.status(500).json({error:error})
        });

        connection.release();
    }