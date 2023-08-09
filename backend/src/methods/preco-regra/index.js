const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClienteID(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemPrecoRegra() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                Convert(varchar(100),PrecoRegra.IDPrecoRegra) + ' - ' + PrecoRegra.DesRegra As Descricao,
                                PrecoRegra.IDPrecoRegra,
                                PrecoRegra.DesRegra,
                                PrecoRegra.DataInicial,
                                PrecoRegra.DataFinal,
                                PrecoRegra.PerAcrescimo,
                                PrecoRegra.PerDesconto,
                                PrecoRegra.IPI,
                                PrecoRegra.ST,
                                PrecoRegra.PIS,
                                PrecoRegra.COFINS,
                                PrecoRegra.ICMS
                            FROM
                                PrecoRegra `

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
                response = { sucess: false, "info": "Não existem registros de regras de preços" }
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