const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClienteID(req, res) {
    let data;
    let response;
    let pesquisa = req.params.pesquisa
    let query

    const connection = await pool.connect();

    function obtemCliente() {
        return new Promise((resolve, reject) => {
            if(pesquisa !== undefined){
                query = `SELECT DISTINCT 
                                subquery.IDCliente,
                                subquery.CodERP,
                                subquery.CNPJCPF,
                                subquery.Razao,
                                subquery.Fantasia,
                                subquery.Cidade,
                                subquery.UFCliente,
                                subquery.Situacao
                            FROM (
                                SELECT
                                    Cliente.IDCliente,
                                    Cliente.CodERP,
                                    Cliente.CNPJCPF,
                                    Cliente.Razao,
                                    Cliente.Fantasia,
                                    Cliente.Cidade,
                                    Cliente.UFCliente,
                                    Cliente.Situacao
                                FROM Cliente WHERE Razao LIKE '%${pesquisa}%'
                                UNION
                                SELECT
                                    Cliente.IDCliente,
                                    Cliente.CodERP,
                                    Cliente.CNPJCPF,
                                    Cliente.Razao,
                                    Cliente.Fantasia,
                                    Cliente.Cidade,
                                    Cliente.UFCliente,
                                    Cliente.Situacao
                                FROM Cliente WHERE Fantasia LIKE '%${pesquisa}%'
                            ) AS subquery`
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemCliente()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Cliente não encontrado" }
                return res.status(404).json(response)
            } else {
                data = results.recordset;
                response = { sucess: true, data: data }
                return res.status(200).json(response)
            }
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }