const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = 
    async function login(req, res) {
        const jwt = require('jsonwebtoken')
        const emailReq = req.body.email;
        const password = req.body.password;
        
        const connection = await pool.connect();
        
        let authenticated = false
        let token = "null"
        let keyToken = process.env.KEY_TOKEN
        let dadosUsuario
        let response
        
        function obtemUsuarios() {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM Usuario WHERE Email = '${emailReq}'`, (error, results) => {
                    if (error) {
                    reject(error);
                    }
                    resolve(results);
                });
            });
        }
        
        
        await obtemUsuarios()
            .then((results) => {
                if (Object.keys(results.recordset).length === 0) {
                    response = { "authenticated": authenticated, token: token, "info": "Email não encontrado" }
                    return res.status(200).json(response)
                } else if (results.recordset[0].Senha !== password) {
                    response = { "authenticated": authenticated, token: token, "info": "Senha incorreta" }
                    return res.status(200).json(response)
                } else {
                    dadosUsuario =results.recordset[0]
                    authenticated = true;
                    token = jwt.sign({'CPFCNPJ':dadosUsuario.CPFCNPJ, 'password': dadosUsuario.Senha}, keyToken, { expiresIn: '1h' });
                    
                    delete dadosUsuario.Senha
                    delete dadosUsuario.Telefone
                    delete dadosUsuario.TelCelular
                    delete dadosUsuario.Foto
                    delete dadosUsuario.CPFCNPJ
                    
                    response = { "authenticated": authenticated, token: token, user_data: dadosUsuario, connection_id: 1 }
                    return res.status(200).json(response)
                }
            })
            .catch((error) => {
                return res.status(500).json({error:error})
            });
            
            connection.release();
        
    }
