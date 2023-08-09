const UserController = require('../../controllers/UserController')

const pool = UserController.pool

module.exports = 
    async function login(req, res) {
        const jwt = require('jsonwebtoken')
        const emailReq = req.body.email;
        const password = req.body.password;

        console.log(password)
        
        const connection = pool;
        
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
                    resolve(results.rows);
                });
            });
        }
        
        
        await obtemUsuarios()
            .then((results) => {
                if (results.length === 0) {
                    response = { "authenticated": authenticated, token: token, "info": "Email não encontrado" }
                    return res.status(200).json(response)
                } else if (results[0].senha !== password) {
                    response = { "authenticated": authenticated, token: token, "info": "Senha incorreta" }
                    return res.status(200).json(response)
                } else {
                    dadosUsuario =results[0];
                    authenticated = true;
                    token = jwt.sign({'CPFCNPJ':dadosUsuario.cpfcnpj, 'password': dadosUsuario.senha}, keyToken, { expiresIn: '1h' });
                    
                    delete dadosUsuario.senha
                    delete dadosUsuario.telefone
                    delete dadosUsuario.telcelular
                    delete dadosUsuario.foto
                    delete dadosUsuario.cpfcnpj
                    
                    response = { "authenticated": authenticated, token: token, user_data: dadosUsuario, connection_id: 1 }
                    return res.status(200).json(response)
                }
            })
            .catch((error) => {
                return res.status(500).json({error:error})
            });
            
            //connection.end();
        
    }
