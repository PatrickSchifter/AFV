const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = async function getTransportador(req, res) {
    let data;
    let response;

    const connection = await pool.connect();

    function obtemTransportador() {
        return new Promise((resolve, reject) => {
            let query =    `SELECT
                                Transportador.IDTransportador,
                                Convert(VARCHAR(100),Transportador.IDTransportador) + ' - ' + Transportador.Fantasia As Fantasia,
                                Transportador.CodERP,
                                Transportador.CNPJCPF,
                                Transportador.Razao,
                                Transportador.Situacao,
                                Transportador.TelFixo,
                                Transportador.TelCelular,
                                Transportador.Email
                            FROM
                                Transportador`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    await obtemTransportador()
    .then((results) => {
        if (Object.keys(results.recordset).length === 0) {
            response = { sucess: false, "info": "Dados do Transportador não encontrados." }
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