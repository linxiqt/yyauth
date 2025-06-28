# 使用说明

## 安装

```html
npm install ar-aes
```

## uniapp使用

1.main.js引入js文件注册.当然也可以哪里需要哪里引入

```html
import AES from 'ar-aes'
Vue.prototype.AES = AES.AES
```

2.页面调用

```html
//加密值
let e = this.AES.encrypt('123','1234567891234567','1234567891234567')

//解密值
this.AES.decrypt(e,'1234567891234567','1234567891234567')
```

## 通用方式

1.JS文件引入

```html
var AES = require("ar-aes");

```

2.页面调用

```html
//加密值
let e = AES.AES.encrypt('123','1234567891234567','1234567891234567')

//解密值
AES.AES.decrypt(e,'1234567891234567','1234567891234567')
```

## encrypt

加密字符串,返回加密后的字符串
| 参数              | 说明                           | 类型     |
|------------------|-------------------------------|---------|
| valueString      | 加密字符串                      | String |
| key              | 加密密码KEY,16位                | String |
| iv               | 偏移量IV,16位                  | String |
| 返回值            | 返回加密后的字符串               | String |

## decrypt

加密字符串,返回加密后的字符串
| 参数              | 说明                           | 类型     |
|------------------|-------------------------------|---------|
| valueString      | 解密字符串                      | String |
| key              | 加密密码KEY,16位                | String |
| iv               | 偏移量IV,16位                  | String |
| 返回值            | 返回解密后的字符串，解密失败返回空字符串               | string 或 '' |
