const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getTipoPedido(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemTipoPedido() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                TipoPedido.IDTipoPedido,
                                TipoPedido.DesTipoPedido,
                                TipoPedido.TemVolume,
                                TipoPedido.TemCascata,
                                TipoPedido.TemMargem,
                                TipoPedido.TemMinimo,
                                TipoPedido.TemEstoque,
                                TipoPedido.CodERP,
                                TipoPedido.IDPreco,
                                TipoPedido.IDMargem,
                                TipoPedido.Situacao,
                                TipoPedido.IDFreteCIF,
                                TipoPedido.OrdemImpressao,
                                TipoPedido.LayoutImpressao,
                                TipoPedido.AlterarValorFrete,
                                TipoPedido.DescComposto
                            FROM
                                TipoPedido`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    await obtemTipoPedido()
    .then((results) => {
        if (Object.keys(results.recordset).length === 0) {
            response = { sucess: false, "info": "Dados do Tipo de Pedido não encontrados." }
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