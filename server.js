const express=require('express');
const session = require('express-session');
const ejs =require('ejs');
require('dotenv').config();

const app=express();
app.use(express.static('public'));

app.get("/login",(req, res)=>{
    res.render('login.ejs');
})


app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en ${process.env.PORT}`)
}
)