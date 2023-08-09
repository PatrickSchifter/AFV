const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getOfertaEstrutura(req, res) {
    let data;
    let response;
    const {idoferta} = req.query;

    const connection = await pool.connect();

    function getOfertaEstrutura() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT 
                                Produto.DesERP as DesProduto,
                                Familia.Descricao as DesFamilia,
                                GrandeGrupo.Descricao as DesGrandeGrupo,
                                Grupo.Descricao as DesGrupo,
                                SubGrupo.Descricao as DesSubGrupo,
                                Marca.Descricao as DesMarca,
                                Categoria.Descricao as DesCategoria,
                                Fabricante.Descricao as DesFabricante,
                                LinhaProduto.DesLinha as DesLinha,
                                OfertaEstrutura.DesOferta,
                                OfertaEstrutura.DesOferta2,
                                OfertaEstrutura.QtOferta,
                                OfertaEstrutura.QtMinima,
                                OfertaEstrutura.QtMaxima,
                                OfertaEstrutura.IDOFerta,
                                OfertaEstrutura.IDOfertaEstrutura,
                                Produto.SKU,
								OfertaEstrutura.IDProduto,
								OfertaEstrutura.IDFamilia,
								OfertaEstrutura.IDGGrupo,
								OfertaEstrutura.IDGrupo,
								OfertaEstrutura.IDSgrupo,
								OfertaEstrutura.IDMarca,
								OfertaEstrutura.IDCategoria,
								OfertaEstrutura.IDFabricante,
								OfertaEstrutura.IDLinha
                            FROM OfertaEstrutura
                            LEFT JOIN Produto
                            ON OfertaEstrutura.IDProduto = Produto.IDProduto 
                            LEFT JOIN Familia
                            ON OfertaEstrutura.IDFamilia = Familia.IDFamilia 
                            LEFT JOIN GrandeGrupo
                            ON OfertaEstrutura.IDGGrupo = GrandeGrupo.IDGrandeGrupo 
                            LEFT JOIN Grupo
                            ON OfertaEstrutura.IDGrupo = Grupo.IDGrupo 
                            LEFT JOIN SubGrupo
                            ON OfertaEstrutura.IDSGrupo = SubGrupo.IDSubGrupo 
                            LEFT JOIN Marca
                            ON OfertaEstrutura.IDMarca = Marca.IDMarca 
                            LEFT JOIN Categoria
                            ON OfertaEstrutura.IDCategoria = Categoria.IDCategoria 
                            LEFT JOIN Fabricante
                            ON OfertaEstrutura.IDFabricante = Fabricante.IDFabricante 
                            LEFT JOIN LinhaProduto
                            ON OfertaEstrutura.IDLinha = LinhaProduto.IDLinha `
            if(idoferta){
                query = query + 'WHERE ';
                if(idoferta){
                    query = query + `OfertaEstrutura.IDOFerta=${idoferta} `
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

        await getOfertaEstrutura()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Estrutura não encontrada.", data:[] }
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