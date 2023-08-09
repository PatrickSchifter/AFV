const express = require('express')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const https= require('https');

app.use(cors());


require('dotenv').config()

const protocol = process.env.PROTOCOL || 'http'
const ip = require('ip').address()
const port = process.env.PORT || 3030
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => console.log(
    `Server started in http://localhost:${port} or ${protocol}://${ip}:${port}`
))

https.createServer(
    {
        cert:fs.readFileSync('src/SSL/code.crt'),
        key: fs.readFileSync('src/SSL/code.key')
    },
    app
).listen(3031, () => console.log(`Server https in https://localhost:${3031} or ${protocol}://${ip}:${port}`));