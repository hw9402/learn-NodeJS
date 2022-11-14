# 콘솔에서 입력받기

```javascript
var args = process.argv;
console.log(args[2]);
// node input.js asdf
// asdf
```

```javascript
var args = process.argv;
console.log(args[2], args[3]);
// node input.js asdf fdsa
// asdf fdsa
```

```javascript
var args = process.argv.slice(2);
console.log(args);
// node input.js asdf
// ['asdf']
```