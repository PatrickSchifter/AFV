const UserController = require('../../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClienteFiscalID(req, res) {
    let data;
    let response;
    let idCliente = req.params.idcliente

    const connection = await pool.connect();

    function obtemClienteFiscal() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                ClienteFiscal.IDCliente,
                                ClienteFiscal.CNAEPrincipal,
                                ClienteFiscal.InscEstadual,
                                ClienteFiscal.InscMunicipal,
                                ClienteFiscal.NatJuridica,
                                ClienteFiscal.SitFiscal,
                                ClienteFiscal.Destinacao,
                                ClienteFiscal.ContribuinteICMS,
                                ClienteFiscal.OrgaoPublico
                            FROM
                                ClienteFiscal `
            if(idCliente !== undefined){
                query = query +  `WHERE ClienteFiscal.IDCliente = ${idCliente}`
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemClienteFiscal()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Cliente Fiscal não encontrado" }
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