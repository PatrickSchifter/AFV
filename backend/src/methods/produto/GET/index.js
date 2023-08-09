const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getProduto(req, res) {
    let data;
    let response;
    const {idproduto, pagina, pesquisa} = req.query;

    const connection = await pool.connect();

    function obtemProduto() {
        return new Promise((resolve, reject) => {
            let query;
            if(pesquisa){
                query=`SELECT
                            Produto.IDProduto,
                            Produto.SKU,
                            Produto.CodERP,
                            Produto.DesERP,
                            Produto.UniMedida,
                            Produto.DesSecundaria,
                            Produto.CodSecundario,
                            Produto.Fabricante,
                            Produto.Marca,
                            Produto.Situacao
                        FROM
                            Produto 
                        WHERE 
                            SKU LIKE '%${pesquisa}%'
                        UNION
                        SELECT
                            Produto.IDProduto,
                            Produto.SKU,
                            Produto.CodERP,
                            Produto.DesERP,
                            Produto.UniMedida,
                            Produto.DesSecundaria,
                            Produto.CodSecundario,
                            Produto.Fabricante,
                            Produto.Marca,
                            Produto.Situacao
                        FROM
                            Produto 
                        WHERE 
                            DesERP LIKE '%${pesquisa}%'`

                connection.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                });
            }else if(idproduto){
                query =`SELECT
                            Produto.IDProduto,
                            Produto.SKU,
                            Produto.CodERP,
                            Produto.DesERP,
                            Produto.UniMedida,
                            Produto.DesSecundaria,
                            Produto.CodSecundario,
                            Produto.Fabricante,
                            Produto.Marca,
                            Produto.Situacao
                        FROM
                            Produto 
                        WHERE 
                            Produto.IDProduto=${idproduto}`

                connection.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                });
            }else{
                if(pagina){
                    query = `SELECT * 
                    FROM Produto 
                    ORDER BY IDProduto
                    OFFSET ${pagina === 1? 0: (pagina - 1) * 100} ROWS
                    FETCH NEXT 100 ROWS ONLY
                    `

                    connection.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                    });
                }else{
                    reject({ sucess: false, "info": "É necessário fornecer o número da página" });
                }
            }
        });
    }

    const qtdItens = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT COUNT(*) AS total FROM Produto', (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            })
        })
    } 

    const qtdPagina = await qtdItens()
    .then((results) => {
        return parseInt((results.recordset[0].total / 100) + 1)
    })

    await obtemProduto()
    .then((results) => {
        if (Object.keys(results.recordset).length === 0) {
            response = { sucess: false, "info": "Produto não encontrado" }
            return res.status(404).json(response)
        } else {
            data = results.recordset;
            response = { sucess: true, data: data, total_paginas: qtdPagina }
            return res.status(200).json(response)
        }
    })
    .catch((error) => {
        return res.status(500).json({error:error})
    });

    connection.release();
}