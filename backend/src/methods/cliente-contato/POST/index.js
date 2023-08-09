const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function postClienteContato(req, res) {
    let data;
    let dadosContato = req.body.dados_contato

    const connection = await pool.connect();

    function gravaClienteContato() {
        return new Promise((resolve, reject) => {
            let query =    `INSERT INTO [dbo].[ClienteContato] (
                [IDCliente],
                [Nome],
                [DataNascimento],
                [Funcao],
                [Departamento],
                [TelFixo],
                [TelCelular],
                [NumWhats],
                [EmailCorp],
                [PedidoCorp],
                [EmailPessoal],
                [PedidoPessoal],
                [Situacao]
            ) VALUES (
                ${dadosContato.IDCliente},
                '${dadosContato.Nome}',
                ${dadosContato.DataNascimento === null ? `NULL`: "'" + dadosContato.DataNascimento + "'"},
                ${dadosContato.Funcao === null ? `NULL`: "'" + dadosContato.Funcao + "'"},
                ${dadosContato.Departamento === null ? `NULL`: "'" + dadosContato.Departamento + "'"},
                ${dadosContato.TelFixo === null ? `NULL`: "'" + dadosContato.TelFixo + "'"},
                ${dadosContato.TelCelular === null ? `NULL`: "'" + dadosContato.TelCelular + "'"},
                ${dadosContato.NumWhats === null ? `NULL`: "'" + dadosContato.NumWhats + "'"},
                ${dadosContato.EmailCorp === null ? `NULL`: "'" + dadosContato.EmailCorp + "'"},
                ${dadosContato.PedidoCorp ? "'" + dadosContato.PedidoCorp + "'": "'" + 'N' + "'"},
                ${dadosContato.EmailPessoal === null ? `NULL`: "'" + dadosContato.EmailPessoal + "'"},
                ${dadosContato.PedidoPessoal ? "'" + dadosContato.PedidoPessoal + "'": "'" + 'N' + "'"},
                ${dadosContato.Situacao ? "'" + dadosContato.Situacao + "'": "'" + 'A' + "'"}
            );`

            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        }
        
        await gravaClienteContato()
        .then((results) => {
            data = results
            return res.status(200).json({sucess: true, data: data})
        })
        .catch((error) => {
            return res.status(500).json({error:error})
        });

        connection.release();
}