require('dotenv').config()
var mysql = require('mysql');

const user = process.env.DB_USER;
const password = process.env.DB_PSW;
const hostname = process.env.DB_HOST;
const port = process.env.DB_PORT;
var connection;

class Database {

    testConnection() {
        connection = mysql.createConnection({
            host     : hostname,
            port     : port,
            user     : user,
            password : password
          });
   
        connection.connect();

        connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
          if (err) throw err;
          console.log('The solution is: ', rows[0].solution);
        });   
    }

    end() {
        connection.end();
    }


    authenticate(data) {
      var username = data.username;
      var userPassword = data.password;

      connection = mysql.createConnection({
        host     : hostname,
        port     : port,
        user     : user,
        password : password
      });

      connection.connect();

      connection.query(`SELECT username FROM db.user`, function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
      });

      connection.end();


    }
}

module.exports = Database;