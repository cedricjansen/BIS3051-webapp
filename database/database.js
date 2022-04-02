require('dotenv').config()
var mysql = require('mysql2/promise');
var async = require('async');

const user = process.env.DB_USER;
const password = process.env.DB_PSW;
const hostname = process.env.DB_HOST;
const port = process.env.DB_PORT;
var connection;

class Database {

    end() {
        connection.end();
    }

    // Asynchrone Funktion, die versucht, den Benutzer zu authentifizieren
    async authenticate(data, errors) {
      var username = data.username;
      var userPassword = data.password;

      // Erstelle eine Verbindung
      connection = await mysql.createConnection({
        host     : hostname,
        port     : port,
        user     : user,
        password : password
      });

      // Suche nach User
      var un = await connection.execute( `SELECT username FROM db.user WHERE username = '${username}';`);
      connection.end();
  
      // Wenn user existiert
      if(un[0][0].username == username) {

        connection = await mysql.createConnection({
          host     : hostname,
          port     : port,
          user     : user,
          password : password
        });

        // Vergleiche angegebenes Passwort
        var pw = await connection.execute(`SELECT password FROM db.user WHERE username = '${username}';`);
        
        if(pw[0][0].password == userPassword) {
          // Nutzer authentifiziert
          return true;
        }
      }

      // Nutzer nicht authorisiert
      errors.mismatch = true;
      return false;
    }
 
}

module.exports = Database;