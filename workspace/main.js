var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templeteHTML(title, list, body) {
  return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <a href="/create">create</a>
      ${body}
    </body>
    </html>    
  `;
}

function templeteList(filelist) {
  var list = '<ul>';
  var i=0;
  while(i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i += 1;
  }
  list = list+'</ul>';
  return list;
}

var app = http.createServer((request,response) => {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname === '/') {
      if(queryData.id === undefined) {
        fs.readdir('./data', (err, filelist) => {
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templeteList(filelist);
          var templete = templeteHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(templete);
        });
      } else {
        fs.readdir('./data', (err, filelist) => {
          var list = templeteList(filelist);
          fs.readFile(`./data/${queryData.id}`, 'utf-8', (err, description) => {
            var title = queryData.id;
            var list = templeteList(filelist);
            var templete = templeteHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(templete);
          });
        });
      }
    } else if(pathname === '/create') {
      fs.readdir('./data', (err, filelist) => {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templeteList(filelist);
        var templete = templeteHTML(title, list, `
          <form action="http://localhost:3000/process_create" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `);
        response.writeHead(200);
        response.end(templete);
      });
    } else if(pathname === '/process_create') {
        var body = '';
        request.on('data', (data) => {
          body += data;
        });
        request.on('end', (end) => {
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf-8', (err) => {
            response.writeHead(302, {Location: `/?id=${title}`}); 
            response.end("success"); 
          });
        });
    } else {
      response.writeHead(404);
      response.end("Not found");
    }
});

app.listen(3000);