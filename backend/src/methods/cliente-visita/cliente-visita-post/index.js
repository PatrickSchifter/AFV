const UserController = require('../../../controllers/UserController')

const pool = UserController.pool

module.exports = async function postClienteVisita(req, res) {
    let dadosClienteVisita = req.body.dados_cliente_visita

    const connection = await pool.connect();

    if(dadosClienteVisita.IDClienteVendedor === null){
        return
    }else{
            async function inserirClienteVisita() {
                return new Promise((resolve, reject) => {
                    let query;

                    query =    `MERGE ClienteVisita AS cv
                                USING (VALUES (${dadosClienteVisita.IDClienteVendedor})) AS source (IDClienteVendedor)
                                ON cv.IDClienteVendedor = source.IDClienteVendedor
                                WHEN NOT MATCHED THEN
                                    INSERT (
                                        IDClienteVendedor,
                                        Seg,
                                        Ter, 
                                        Qua, 
                                        Qui, 
                                        Sex, 
                                        Sab, 
                                        Dom, 
                                        Hora1, 
                                        Hora2, 
                                        Recorrencia) 
                                    VALUES (
                                        source.IDClienteVendedor, 
                                        'N', 
                                        'N', 
                                        'N', 
                                        'N', 
                                        'N', 
                                        'N', 
                                        'N', 
                                        NULL, 
                                        NULL, 
                                        NULL);`
                    connection.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                    });
                });
            }
        
            async function alterarClienteVisita() {
                return new Promise((resolve, reject) => {
                    let query =    `UPDATE ClienteVisita
                                    SET	
                                        Seg='${dadosClienteVisita.Seg === undefined ? 'N': dadosClienteVisita.Seg}',
                                        Ter='${dadosClienteVisita.Ter === undefined ? 'N': dadosClienteVisita.Ter}',
                                        Qua='${dadosClienteVisita.Qua === undefined ? 'N': dadosClienteVisita.Qua}',
                                        Qui='${dadosClienteVisita.Qui === undefined ? 'N': dadosClienteVisita.Qui}',
                                        Sex='${dadosClienteVisita.Sex === undefined ? 'N': dadosClienteVisita.Sex}',
                                        Sab='${dadosClienteVisita.Sab === undefined ? 'N': dadosClienteVisita.Sab}',
                                        Dom='${dadosClienteVisita.Dom === undefined ? 'N': dadosClienteVisita.Dom}',
                                        Hora1=${dadosClienteVisita.Hora1 === null || dadosClienteVisita.Hora1 === undefined  ? `NULL`: "'" + dadosClienteVisita.Hora1 + "'"},
                                        Hora2=${dadosClienteVisita.Hora2 === null || dadosClienteVisita.Hora2 === undefined ? `NULL`: "'" + dadosClienteVisita.Hora2 + "'"},
                                        Recorrencia=${dadosClienteVisita.Recorrencia === null || dadosClienteVisita.Recorrencia === undefined ? `NULL`: "'" + dadosClienteVisita.Recorrencia + "'"}
                                    WHERE IDClienteVendedor=${dadosClienteVisita.IDClienteVendedor}
                                    `
                    connection.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                    });
                });
            }
         
            function verificaExistente() {
                return new Promise((resolve, reject) => {
                    query = `SELECT * FROM ClienteVisita WHERE IDClienteVendedor=${dadosClienteVisita.IDClienteVendedor}`
                    connection.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                    });
                });
            }
            try{
                await verificaExistente()
                .then((results) => {
                    if (results.recordset.length === 0) {
                        async function insert(){
                            await inserirClienteVisita()
                            .then((results)=>{
                            })
                        }
                        connection.release();
                        try{
                            insert();
                        }catch(error){
                            console.log(error)
                        }
                        connection.release();
                    } else {
                        async function update(){
                            await alterarClienteVisita()
                            .then((results)=>{
                                return
                            }).catch((error)=>{
                                console.log(error)
                            })
                        }
                        connection.release();
                        update().then((results)=>{
                            return res.status(200).json({sucess: true, data: results})
                        }).catch((error)=>{
                            return res.status(500).json({error:error})
                        });
                        connection.release();
                    } 
                })
            }catch(error){
                console.log(error)
            }
        
            
            connection.release();
    }
}
