const http = require('http');
const fs = require('fs').promises;
const port = 8081;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile(__dirname + '/server2.html');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    } catch(err) {
        console.log(err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
})
.listen(port, () => {
    console.log(`${port}번 포트에서 서버 대기 중입니다!`);
});