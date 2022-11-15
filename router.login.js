const express = require('express');
const crypto = require('crypto');
const Conexion = require('./BBDD');
const fetch = require('node-fetch');
const session = require('express-session');
const route = express.Router();

route.get("/", (req, res) => {
    res.render('login.ejs');
})
route.post("/", (req, res) => {
    let con = new Conexion();
    const hash = crypto.createHash('sha256', process.env.SECRET)
        // updating data
        .update(req.body.pass)
        // Encoding to be used
        .digest('hex');
    con.login(req.body.email, hash, (validacion) => {
        if (validacion) {
            fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: process.env.user_api, pass: process.env.pass_api })
            })
            .then(res => res.json())
            .then(res => {
                token=res.data.token;
                session.user={
                    email:req.body.email,
                    token
                }
                res.send("todo ok")
            });
            
        } else {
            res.render('login.ejs', { msg: 'usuario o pass incorrecto' })
        }
    });
})
route.get("/register", (req, res) => {
    res.render("register.ejs")
})
route.post("/register", (req, res) => {
    let user = req.body;
    const hash = crypto.createHash('sha256', process.env.SECRET)
        // updating data
        .update(user.pass)
        // Encoding to be used
        .digest('hex');
    user.pass = hash;
    let con = new Conexion();
    con.register(user, (datos) => {
        res.send("creando usuario")
    })


})

module.exports = route