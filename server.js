const express=require('express');
const bodyParser=require('body-parser');
const session = require('express-session');
const Conexion=require('./BBDD')
const ejs =require('ejs');
require('dotenv').config();
const crypto = require('crypto');

const app=express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: '5577-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.get("/login",(req, res)=>{
    res.render('login.ejs');
})
app.post("/login",(req,res)=>{
    let con=new Conexion();

    con.login(req.body.email,req.body.pass,(validacion)=>{
        if(validacion){
            res.send("todo ok")
        }else{
             res.render('login.ejs',{msg:'usuario o pass incorrecto'})           
        }
    });
})
app.get("/register",(req,res)=>{
    res.render("register.ejs")
})
app.post("/register",(req,res)=>{
    let user=req.body;
    let con=new Conexion();
    con.register(user,(datos)=>{
        res.send("creando usuario")
    })

    
})



app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en ${process.env.PORT}`)
}
)