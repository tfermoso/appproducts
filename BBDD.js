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
        this.connection.execute(
            'SELECT * FROM users where username=? and password=?',
            [user, pass],
            function (err, results, fields) {
                let resultadoValidacion=(results.length > 0)
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
