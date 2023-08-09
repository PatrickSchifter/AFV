const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getClienteVisitaID(req, res) {
    let data;
    let response;
    let idClienteVendedor = req.params.idclientevendedor

    const connection = await pool.connect();

    function obtemClienteVisita() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                ClienteVisita.IDClienteVendedor,
                                ClienteVisita.Seg,
                                ClienteVisita.Ter,
                                ClienteVisita.Qua,
                                ClienteVisita.Qui,
                                ClienteVisita.Sex,
                                ClienteVisita.Sab,
                                ClienteVisita.Dom,
                                ClienteVisita.Hora1,
                                ClienteVisita.Hora2,
                                ClienteVisita.Recorrencia
                            FROM ClienteVisita `
            if(idClienteVendedor !== undefined){
                query = query +  `WHERE ClienteVisita.IDClienteVendedor = '${idClienteVendedor}'`
            }else{
                reject('IDClienteVendedor não preenchido')
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemClienteVisita()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Cliente Visita não encontrado", status: 404 }
                return res.status(200).json(response)
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