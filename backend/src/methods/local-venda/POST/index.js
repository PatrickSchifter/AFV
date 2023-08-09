const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function insertLocalVenda(req, res) {
    let data;
    let dadosLocalVenda = req.body.dados_local_venda

    const connection = await pool.connect();

    function inserirLocalVenda() {
        return new Promise((resolve, reject) => {
            let query =`INSERT INTO LocalVenda(
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
                            Situacao,
                            Foto
                        )VALUES(
                            '${dadosLocalVenda.CNPJ}',
                            '${dadosLocalVenda.Razao}',
                            '${dadosLocalVenda.Fantasia}',
                            '${dadosLocalVenda.CEP}',
                            '${dadosLocalVenda.Logradouro}',
                            '${dadosLocalVenda.Numero}',
                            '${dadosLocalVenda.Complemento}',
                            '${dadosLocalVenda.Bairro}',
                            ${dadosLocalVenda.CodIBGE},
                            ${dadosLocalVenda.CodERP},
                            '${dadosLocalVenda.Situacao}',
                            CONVERT(varbinary(max), '${dadosLocalVenda.Foto}', 2)
                        );
                        SELECT MAX(IDLocalVenda) AS IDLocalVenda FROM LocalVenda;`

            connection.query(query, (error, results) => {
                if (error) {
                    console.log(console.log(error));
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await inserirLocalVenda()
        .then((results) => {
            data = results
            return res.status(201).json({sucess: true , data: data})
        })
        .catch((error) => {
            return res.status(500).json({error: error})
        });

        connection.release();
    }