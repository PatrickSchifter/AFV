const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = async function menu(req, res) {

    const idUsuario = req.params.idusuario;
    const connection = await pool.connect();
    let data;

    function obtemItensMenu() {
        let query =    `SELECT 
                            Menu.IDMenu, 
                            DescMenu, 
                            Visualizar, 
                            Alterar,
                            IDMenuPai
                        FROM Menu
                        LEFT JOIN AcessoPerfilPermissao
                        ON Menu.IDMenu = AcessoPerfilPermissao.IDMenu
                        LEFT JOIN Usuario
                        ON AcessoPerfilPermissao.IDPerfil = Usuario.IDPerfil
                        WHERE (IDUsuario = ${idUsuario} OR IDUsuario IS NULL) 
                        AND (Visualizar = 'S' OR Visualizar IS NULL)
                        ORDER BY isnull(Menu.IDMenuPai,Menu.IDMenu)`

        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    await obtemItensMenu()
        .then((results) => {
            data = results.recordset;
            const response = { sucess: true, data: data }
            return res.status(200).json(response)
        })
        .catch((error) => {
            return res.status(500).json({error:error})
        });

    
    connection.release();

}