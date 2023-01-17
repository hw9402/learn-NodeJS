const http = require('http');
const port = 3001;

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.write('<h3>Hello Node!</h3>');
    res.end('<p>Hello Server!</p>');
})
.listen(port, () => {
    console.log(`${port}번 포트에서 서버 대기 중입니다!`);
});