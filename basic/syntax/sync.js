var fs = require('fs');

// readFileSync는 return값을 넘겨주기 때문에 변수에 저장해야 함
// readFile은 return값을 넘겨주지 않기 때문에 함수만 사용함

// // 동기적 방식
// console.log('동기적 방식')
// console.log('A');
// var result = fs.readFileSync('./syntax/sample.txt', 'utf-8');
// console.log(result);
// console.log('C');

// 비동기적 방식
console.log('비동기적 방식')
console.log('A');
fs.readFile('./syntax/sample.txt', 'utf-8', (err, file) => {
    console.log(file);
});
console.log('C');