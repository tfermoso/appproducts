const express=require('express');
const bodyParser=require('body-parser');
const session = require('express-session');
const Conexion=require('./BBDD')
const ejs =require('ejs');
require('dotenv').config();


const app=express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: '5577-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.get("/login",(req, res)=>{
    res.render('login.ejs',{'msg':undefined});
})
app.post("/login",(req,res)=>{
    let con=new Conexion();
    con.login(req.body.email,req.body.pass,(validacion)=>{
        if(validacion){

        }else{
             res.render('login.ejs',{msg:'usuario o pass incorrecto'})           
        }
    });

})


app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en ${process.env.PORT}`)
}
)