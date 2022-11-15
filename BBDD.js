const mysql = require('mysql2');
class Conexion{

    constructor(){

        this.connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER_DB,
            //pass: process.env.PASS_DB,
            database: process.env.DB
        });
       
    }

    login(user,pass,callback){
        let self=this;
        let resultadoValidacion=false;
        this.connection.execute(
            'SELECT * FROM user where email=? and password=?',
            [user, pass],
            function (err, results, fields) {
                if(err!=undefined){
                    console.log(err)
                   
                }else{
                  resultadoValidacion=(results.length > 0)
                  
                }
                self.connection.end();
                callback(resultadoValidacion)
            }
        );
    }

    register(user,callback){
        let self=this;
        this.connection.execute(
            'INSERT INTO user (username,email,password) values (?,?,?)',
            [user.username, user.email,user.pass],
            function (err, results, fields) {
                let resultadoValidacion=(results > 0)
                self.connection.end();
                callback(resultadoValidacion)
            }
        );
 
    }

    getDatos(callback){
        let self=this;
        this.connection.execute(
            'SELECT * FROM producto',            
            function (err, results, fields) {
                self.connection.end();
                callback(results);
            }
        );
    }
}

module.exports=Conexion;
