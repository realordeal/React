var express = require('express'); // 웹 서버 사용
var fs = require('fs') // 파일 로드 사용
var app = express();
var port = 3000;
var oracledb = require('oracledb')
var config = {
    user: "assignment",
    password: "a1234",
    connectString: "localhost:1521/xe"
}

app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


app.listen(port, function(){
    console.log('Server Start, Port : ' + port);
});

app.get('/INSERT', function(req, res){
    fs.readFile('InsertJS.html', function(error, data){
        if(error){
            console.log(error);
        }else{
            res.writeHead(200, {'Content-Type': 'text/html;'});
            res.end(data);
        }
    });

    // oracledb.getConnection(config, (err, conn) =>{
    //     todoWork(err, conn);
    // });
    //
    // function todoWork(err, connection) {
    //     if (err) {
    //         console.error("connection err = "+err.message);
    //         return;
    //     }
    //     connection.execute("select * from mem_info", [], function (err, result) {
    //         if (err) {
    //             console.error("exe error"+err.message);
    //             doRelease(connection);
    //             return;
    //         }
    //         console.log(result.metaData);  //테이블 스키마
    //         console.log(result.rows);  //데이터
    //         res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    //         res.end(result.rows[0][0]+"");
    //         doRelease(connection);
    //     });
    // }
    //
    // function doRelease(connection) {
    //     connection.release(function (err) {
    //         if (err) {
    //             console.error(err.message);
    //         }
    //     });
    // }
});
app.get('/GETDB', function(req, res){
  oracledb.getConnection(config, (err, conn) =>{
      todoWork(err, conn);
  });

  function todoWork(err, connection) {
      if (err) {
          console.error("connection err = "+err.message);
          return;
      }
      connection.execute("select * from mem_info", [], function (err, result) {
          if (err) {
              console.error("exe error"+err.message);
              doRelease(connection);
              return;
          }
          console.log(result.metaData);  //테이블 스키마
          console.log(result.rows);  //데이터
          res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
          res.end(result.rows);
          doRelease(connection);
      });
  }

  function doRelease(connection) {
      connection.release(function (err) {
          if (err) {
              console.error(err.message);
          }
      });
  }

});
