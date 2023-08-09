const UserController = require('../../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getVolumeFaixaID(req, res) {
    let data;
    let response;
    let idVolume = req.params.idvolume

    const connection = await pool.connect();

    function obtemVolumeFaixa() {
        return new Promise((resolve, reject) => {
            let query =`SELECT 
                            VolumeFaixa.IDVolumeFaixa,
                            VolumeFaixa.VlComprasDE,
                            VolumeFaixa.VlComprasATE,
                            VolumeFaixa.PerDesconto
                        FROM VolumeFaixa `
            if(idVolume){
                query = query +`WHERE VolumeFaixa.IDVolume = ${idVolume}
                                ORDER BY IDVolumeFaixa DESC`
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemVolumeFaixa()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "VolumeFaixa não encontrado"}
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