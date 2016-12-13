console.log('Start Icare Application');

var express = require('express'),
  config = require('./config/config');



var Connection = require('tedious').Connection;
var configDB = {
  userName: 'icare',
  password: 'Enedis2016',
  server: 'icareenedis.database.windows.net',
  // If you are on Microsoft Azure, you need this:
  options: {
    encrypt: true,
    database: 'icare'
  }
};
var connection = new Connection(configDB);
connection.on('connect', function(err) {
  // If no error, then good to proceed.
  console.log("Connected");
  executeStatement();
});
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function executeStatement() {
  return new Promise(function(resolve, reject) {
    //request = new Request("INSERT INTO sd_oups VALUES (1, 'mon titre','ceci est un text','electrique','test');", function(err) {
    //request = new Request("CREATE TABLE sd_oups (id int, titre varchar(255), message_prev text, famille_danger varchar(255), description text );", function(err) {
    //request = new Request("SELECT * FROM sd_oups;", function(err) {

    //request = new Request("INSERT INTO sd_diffusion VALUES (3, 1, 2);", function(err) {
    //request = new Request("CREATE TABLE sd_diffusion (id int, major int, minor int);", function(err) {
    request = new Request("SELECT * FROM sd_oups;", function(err) {
      if (err) {
        console.log(err);
      }
    });
    var result = "";
    var resultFinal = [];
    request.on('row', function(columns) {
      columns.forEach(function(column) {
        if (column.value === null) {
          console.log('NULL');
        } else {
          result += column.value + "-";
        }
      });
      console.log(result);
      resultFinal.push(result);
      result = "";
    });

    request.on('done', function(rowCount, more) {
      console.log(rowCount + ' rows returned');
    });
    request.on('doneProc', function(rowCount, more) {
      console.log(rowCount + ' rows returned');
      resolve(resultFinal);
    });
    connection.execSql(request);
  });
}


function changeStatement(id,minor) {
  return new Promise(function(resolve, reject) {
    //request = new Request("INSERT INTO sd_oups VALUES (1, 'mon titre','ceci est un text','electrique','test');", function(err) {
    //request = new Request("CREATE TABLE sd_oups (id int, titre varchar(255), message_prev text, famille_danger varchar(255), description text );", function(err) {
    //request = new Request("SELECT * FROM sd_oups;", function(err) {

    //request = new Request("INSERT INTO sd_diffusion VALUES (3, 1, 2);", function(err) {
    //request = new Request("CREATE TABLE sd_diffusion (id int, major int, minor int);", function(err) {
    request = new Request("INSERT INTO sd_diffusion VALUES ("+id+", 1, "+minor+");;", function(err) {
      if (err) {
        console.log(err);
      }
    });
    var result = "";
    var resultFinal = [];
    request.on('row', function(columns) {
      columns.forEach(function(column) {
        if (column.value === null) {
          console.log('NULL');
        } else {
          result += column.value + "-";
        }
      });
      console.log(result);
      resultFinal.push(result);
      result = "";
    });

    request.on('done', function(rowCount, more) {
      console.log(rowCount + ' rows returned');
    });
    request.on('doneProc', function(rowCount, more) {
      console.log(rowCount + ' rows returned');
      resolve(resultFinal);
    });
    connection.execSql(request);
  });
}


var app = express();
var http = require('http').Server(app);

app.get('/admin', function(req, res) {
  console.log('Send Socket');

  executeStatement().then(
    function(response) {
      console.log("Success!", response);

      console.log('Data received');
      console.log(response);
    },
    function(error) {
      console.error("Failed!", error);
    }
  )
  console.log(__dirname + '/admin.html');
  res.sendFile(__dirname + '/admin.html');
});



app.get('/database/info', function(req, res) {
  console.log('/database/info');
  var array = [["mon titre","ceci est un text","electrique","test","1"],["mon titre4","ceci est un texte4","electrique4","test4","4"]];
  executeStatement().then(
    function(response) {
      console.log("Success!", response);
      array = [];

      console.log('Data received');
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var linetmp = response[i];
        console.log('linetmp ', i );
        console.log(linetmp);
        var line = linetmp.split('-');

        console.log('Ligne ', i );
        console.log(line);

        array.push([line[1], line[2], line[3], line[4], line[0]]);
        console.log('Tmp Array');
        console.log(array);
      }
      console.log('Final Array');
      console.log(array);

      res.send(array);
    },
    function(error) {
      console.error("Failed!", error);
      res.send(array);
    }
  )
});

app.get('/supress', function(req, res) {
  console.log('supress');
  var id = req.query.id;
  changeStatement(id,1);
  console.log('supress OK ' + id);

  console.log(__dirname + '/admin.html');
  res.sendFile(__dirname + '/admin.html');
});

app.get('/diffuse', function(req, res) {
  console.log('diffuse');
  var id = req.query.id;
  changeStatement(id,2);
  console.log('diffuse OK ' + id);
  //res.send(array);
  console.log(__dirname + '/admin.html');
  res.sendFile(__dirname + '/admin.html');
});


app.get('/hello', function(req, res) {
  console.log('Send Socket');
  console.log(__dirname + '/index.html');
  res.sendFile(__dirname + '/index.html');
});



module.exports = require('./config/express')(app, config);

http.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});
