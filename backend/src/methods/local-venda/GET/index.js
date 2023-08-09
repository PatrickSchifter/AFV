const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getLocalVenda(req, res) {
    let data;
    let response;
    const {cnpj, razao, fantasia, situacao, idlocalvenda, coderp} = req.query;

    const connection = await pool.connect();

    function obtemLocalVenda() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                IDLocalVenda,
                                CNPJ,
                                Razao,
                                Fantasia,
                                CEP,
                                Logradouro,
                                Numero,
                                Complemento,
                                Bairro,
                                CodIBGE,
                                CodERP,
                                Situacao
                            FROM
                                LocalVenda `
            if(cnpj || razao || fantasia || situacao || idlocalvenda || coderp){
                query = query + 'WHERE ';
                if(idlocalvenda){
                    query = query + `LocalVenda.IDLocalVenda=${idlocalvenda} `
                }else if(coderp){
                    query = query + `LocalVenda.CodERP=${coderp} `
                }else if(razao){
                    if(razao && idlocalvenda){
                        query = query + 'AND ';
                    }
                    query = query + `LocalVenda.Razao LIKE'%${razao}%' `
                }else if(fantasia){
                    if(fantasia && razao || fantasia && idlocalvenda){
                        query = query + 'AND ';
                    }
                    query = query + `LocalVenda.Fantasia LIKE'%${fantasia}%' `
                }
                else if(situacao){
                    if(situacao && razao || situacao && idlocalvenda || situacao && fantasia){
                        query = query + 'AND ';
                    }
                    query = query + `LocalVenda.Situacao='${situacao}' `
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

        await obtemLocalVenda()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Locais de Venda não encontrados." }
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