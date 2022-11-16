const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const route = require('./router.login')
const getToken = require('./getToken')
const ejs = require('ejs');
const verifySession = require('./midleware/validate-session')
require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: '5577-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use("/login", route)

app.use("/producto", verifySession, (req, res) => {
    console.log(app.token)
    res.render('./producto/index.ejs');
})



app.listen(process.env.PORT, () => {
    setInterval(() => {     
        if (!app.token){
        console.log("Solicitando token")
        console.log(app.token)            
            getToken().then(token => {
                app.token = token;
            })
        }
        else{
            let expiracionToken=parseJwt(app.token).exp;
            let fechaExpiracion=new Date(expiracionToken*1000);
            if(fechaExpiracion<new Date()){
                console.log(app.token)
                getToken().then(token => {
                    app.token = token;
                })
            }
        }   

    }, 3000)

    console.log(`Servidor escuchando en ${process.env.PORT}`)
}
)

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}