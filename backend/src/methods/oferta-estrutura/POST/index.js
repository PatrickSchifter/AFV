const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function insertOferta(req, res) {
    let data;
    let dadosOfertaEstrutura = req.body.dados_oferta_estrutura;

    const connection = await pool.connect();

    function insertOferta() {
        return new Promise((resolve, reject) => {
            let query =
                `INSERT INTO OfertaEstrutura(
                    IDOFerta,
                    IDProduto,
                    IDFamilia,
                    IDGGrupo,
                    IDGrupo,
                    IDSgrupo,
                    IDMarca,
                    IDCategoria,
                    IDFabricante,
                    IDLinha,
                    DesOferta,
                    DesOferta2,
                    QtOferta,
                    QtMinima,
                    QtMaxima
                    )
                VALUES(
                    ${dadosOfertaEstrutura.IDOferta},
                    ${dadosOfertaEstrutura.IDProduto},
                    ${dadosOfertaEstrutura.IDFamilia},
                    ${dadosOfertaEstrutura.IDGGrupo},
                    ${dadosOfertaEstrutura.IDGrupo},
                    ${dadosOfertaEstrutura.IDSgrupo},
                    ${dadosOfertaEstrutura.IDMarca},
                    ${dadosOfertaEstrutura.IDCategoria},
                    ${dadosOfertaEstrutura.IDFabricante},
                    ${dadosOfertaEstrutura.IDLinha},
                    ${dadosOfertaEstrutura.DesOferta},
                    ${dadosOfertaEstrutura.DesOferta2},
                    ${dadosOfertaEstrutura.QtdOferta},
                    ${dadosOfertaEstrutura.QtMinima},
                    ${dadosOfertaEstrutura.QtMaxima}
                );
                SELECT MAX(IDOfertaEstrutura) AS IDOfertaEstrutura FROM OfertaEstrutura;`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await insertOferta()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }