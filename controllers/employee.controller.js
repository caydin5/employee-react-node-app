const mysql = require("mysql");

const db = mysql.createConnection({
    user: process.env.USERDB,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

exports.list = (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
          console.log(err);
      } else {
          // Send client the result to the client if there's no error
          res.send(result);
      }
  });
  };