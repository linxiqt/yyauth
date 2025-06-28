//测试方法:node test.js
var AES = require("./index")

let e = AES.AES.encrypt('123','1234567891234567','1234567891234567')
console.log("加密后的字符串为:"+e);
let ee = AES.AES.decrypt(e,'1234567891234567','1234567891234567')
console.log("解密后的字符串为:"+ee);