const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function updateCascata(req, res) {
    let data;
    let dadosLocalVenda = req.body.dados_local_venda

    const connection = await pool.connect();

    function updateCascata() {
        return new Promise((resolve, reject) => {
            let query =`UPDATE LocalVenda
                        SET
                            CNPJ =        '${dadosLocalVenda.CNPJ}',
                            Razao =       '${dadosLocalVenda.Razao}',
                            Fantasia =    '${dadosLocalVenda.Fantasia}',
                            CEP =         '${dadosLocalVenda.CEP}',
                            Logradouro =  '${dadosLocalVenda.Logradouro}',
                            Numero =      '${dadosLocalVenda.Numero}',
                            Complemento = '${dadosLocalVenda.Complemento}',
                            Bairro =      '${dadosLocalVenda.Bairro}',
                            CodIBGE =      ${dadosLocalVenda.CodIBGE},
                            CodERP =       ${dadosLocalVenda.CodERP},   
                            Situacao =    '${dadosLocalVenda.Situacao}',
                            Foto =         CONVERT(varbinary(max), '${dadosLocalVenda.Foto}', 2)
                        WHERE 
                            IDLocalVenda = ${dadosLocalVenda.IDLocalVenda}`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }
        
    await updateCascata()
    .then((results) => {
        data = results
        return res.status(201).json({sucess: true , data: data})
    })
    .catch((error) => {
        return res.status(500).json({error: error})
    });

    connection.release();
}