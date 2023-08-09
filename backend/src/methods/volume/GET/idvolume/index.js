const UserController = require('../../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getVolumeID(req, res) {
    let data;
    let response;
    let idVolume = req.params.idvolume

    const connection = await pool.connect();

    function obtemVolume() {
        return new Promise((resolve, reject) => {
            let query =`SELECT 
                            Volume.IDVolume,
                            Volume.DesVolume,
                            CONVERT(varchar, Volume.DataInicial,103) as DataInicial,
                            CONVERT(varchar, Volume.DataFinal,103) as DataFinal,
                            Volume.Situacao
                        FROM Volume `
            if(idVolume){
                query = query +`WHERE Volume.IDVolume = ${idVolume}
                                ORDER BY IDVolume DESC`
            }

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }

        await obtemVolume()
        .then((results) => {
            if (Object.keys(results.recordset).length === 0) {
                response = { sucess: false, "info": "Volume não encontrado"}
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