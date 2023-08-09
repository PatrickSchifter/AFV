const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getLocalConfig(req, res) {
    let data;
    let response;
    const {idlocalvenda} = req.query;

    const connection = await pool.connect();

    function obtemLocalConfig() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                IDLocal,
                                Comissao,
                                DescCooperado,
                                DescLocal,
                                DesLimite,
                                TipoPedido,
                                IDFreteCIF,
                                PrazoMedio,
                                PrecoEstrutura,
                                DescComposto,
                                DescVolume,
                                ComDesconto,
                                Preco,
                                CodDepERP,
                                RepetirItem,
                                LiberarDescontoVolume,
                                HabilitarDescontoCliente,
                                HabilitarEventosDesconto,
                                PermitirVendaBloqueado,
                                VisualizarSaldoEstoque,
                                HabilitarDescontoAdicional,
                                HabilitarMargemValor,
                                MostraBanner,
                                ComissaoCompartilhada,
                                UsarValorComImposto,
                                DiasValidade,
                                ListarVendedor
                            FROM LocalConfig `
            if(idlocalvenda){
                query = query + 'WHERE ';
                if(idlocalvenda){
                    query = query + `LocalConfig.IDLocal=${idlocalvenda} `
                }
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    await obtemLocalConfig()
    .then((results) => {
        if (Object.keys(results.recordset).length === 0) {
            response = { sucess: false, "info": "Configuração do Local não encontrada." }
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