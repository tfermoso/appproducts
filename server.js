const express=require('express');
const bodyParser=require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
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
    res.render('login.ejs');
})
app.post("/login",(req,res)=>{
    let con=new Conexion();
    const hash = crypto.createHash('sha256', process.env.SECRET)                    
    // updating data
    .update(req.body.pass) 
    // Encoding to be used
    .digest('hex');
    con.login(req.body.email,hash,(validacion)=>{
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
    const hash = crypto.createHash('sha256', process.env.SECRET)                    
                   // updating data
                   .update(user.pass) 
                   // Encoding to be used
                   .digest('hex');
    user.pass=hash;
    let con=new Conexion();
    con.register(user,(datos)=>{
        res.send("creando usuario")
    })

    
})



app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en ${process.env.PORT}`)
}
)