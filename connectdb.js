/* 
    var Connection = require('tedious').Connection;  
    var config = {  
        server: 's26.winhost.com',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'DB_61033_dbmira_user', //update me
                password: 'gezo7810'  //update me
            }
        },
         options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: false,
            database: 'DB_61033_dbmira'  //update me
        }
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  
    });
    
    connection.connect(); */

/*
Sample for bulk insert
- with options that enables nullable default column
TSQL for table used:
    CREATE TABLE [dbo].[test_bulk](
    [c1] [int]  DEFAULT 58,
    [c2] [varchar](30)
    )
   GO
*/

/* const { Connection, Request, TYPES } = require('tedious');

// Connection configuration to SQL server. (See ../src/connection.js to learn more)
const config = {
  server: 's26.winhost.com',
  authentication: {
    type: 'default',
    options: {
      userName: 'DB_61033_dbmira_user',
      password: 'gezo7810'
    }
  },
  options: {
    port: 1433 // Default Port
  }
};

const connection = new Connection(config); */
/* 
const table = '[dbo].[test_bulk]'; */

// Creating new table called [dbo].[test_bulk]
//--------------------------------------------------------------------------------
/* connection.connect((err) => {
  if (err) {
    console.log('Connection Failed');
    throw err;
  }

  createTable();
}); */

/* function createTable() {
  const sql = `CREATE TABLE ${table} ([c1] [int]  DEFAULT 58, [c2] [varchar](30))`;
  const request = new Request(sql, (err) => {
    if (err) {
      throw err;
    }

    console.log(`'${table}' created!`);
    loadBulkData();
  });

  connection.execSql(request);
} */


// Executing Bulk Load
//--------------------------------------------------------------------------------
/* function loadBulkData() {
  const option = { keepNulls: true }; // option to enable null values
  const bulkLoad = connection.newBulkLoad(table, option, (err, rowCount) => {
    if (err) {
      throw err;
    }

    console.log('rows inserted :', rowCount);
    console.log('DONE!');
    connection.close();
  });

  // setup columns
  bulkLoad.addColumn('c1', TYPES.Int, { nullable: true });
  bulkLoad.addColumn('c2', TYPES.NVarChar, { length: 50, nullable: true });

  // add rows into an array
  const rows = [{ c1: 1 }, { c1: 2, c2: 'hello' }];

  // perform bulk insert
  connection.execBulkLoad(bulkLoad, rows);
} */







/* 
npm install -g tedious sequelize-auto
sequelize-auto -o "./models" -d DB_61033_dbmira -h s26.winhost.com -u DB_61033_dbmira_user -p 1433 -x gezo7810 -e mssql */












/* var mysql = require('mysql');

var con = mysql.createConnection({
  host: "s26.winhost.com",
  user: "DB_61033_dbmira_user",
  password: "gezo7810",
  database : "DB_61033_dbmira",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
}); */

var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'DB_61033_dbmira_user',
        password: 'gezo7810',
        server: 's26.winhost.com', 
        database: 'DB_61033_dbmira',
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        console.log(request);
           
        // query to the database and get the records
        request.query("select top 10 * FROM Clienti WHERE CategoriaCliente LIKE  'INESISTENTE' AND CAP LIKE '80021'", function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            console.log(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});



/* 
export NODE_OPTIONS="--max_old_space_size=(X * 1024)" */