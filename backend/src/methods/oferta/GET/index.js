const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getOferta(req, res) {
    let data;
    let response;
    const {descricao, vigente, vencido, idoferta} = req.query;

    const connection = await pool.connect();

    function obtemOferta() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                Oferta.IDOferta,
                                Oferta.Descricao,
                                CONVERT(varchar, Oferta.DtInicial,103) as DtInicial,
                                CONVERT(varchar, Oferta.DtFinal,103) as DtFinal
                            FROM
                                Oferta `
            if(descricao || vigente || vencido || idoferta){
                query = query + 'WHERE ';
                if(idoferta){
                    query = query + `Oferta.IDOferta=${idoferta} `
                }
                if(descricao){
                    query = query + `Oferta.Descricao LIKE '%${descricao}%' `
                }
                if(vigente === 'S'){
                    if(vigente === 'S' && descricao){
                        query = query + 'AND '
                    }
                    query = query + `Oferta.DtFinal > GETDATE() `
                }
                if(vencido === 'S'){
                    if((vencido === 'S' && descricao) || (vencido === 'S' && vigente === 'S')){
                        query = query + 'AND '
                    }
                    query = query + `Oferta.DtFinal < GETDATE() `
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

        await obtemOferta()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Ofertas não encontradas." }
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