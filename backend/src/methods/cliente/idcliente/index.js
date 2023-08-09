const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClienteID(req, res) {
    let data;
    let response;
    let idCliente = req.params.id

    const connection = await pool.connect();

    function obtemCliente() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                Cliente.IDCliente,
                                Cliente.CodERP,
                                Cliente.CNPJCPF,
                                Cliente.Razao,
                                Cliente.Fantasia,
                                Cliente.Cidade,
                                Cliente.UFCliente,
                                Cliente.Situacao,
                                CONVERT(varchar, ClienteDado.DataFundacao,103) as DataFundacao,
                                ClienteDado.TelFixo,
                                ClienteDado.TelCelular,
                                ClienteDado.Email,
                                ClienteDado.CEP,
                                ClienteDado.Logradouro,
                                ClienteDado.Numero,
                                ClienteDado.Complemento,
                                ClienteDado.Bairro,
                                ClienteDado.CodIBGE,
                                ClienteFiscal.InscEstadual,
                                Usuario.UsuarioERP,
                                Usuario.Nome + ' ' + Usuario.Sobrenome As NomeUsuario
                            FROM
                                Cliente
                                Left Join
                                ClienteDado On Cliente.IDCliente = ClienteDado.IDCliente
                                Inner Join
                                ClienteFiscal On Cliente.IDCliente = ClienteFiscal.IDCliente
                                Left Join
                                Usuario On Cliente.IDCliente = Usuario.IDCliente `
            if(idCliente !== undefined){
                query = query +  `WHERE Cliente.IDCliente = '${idCliente}'
                                ORDER BY Cliente.IDCliente DESC;`
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