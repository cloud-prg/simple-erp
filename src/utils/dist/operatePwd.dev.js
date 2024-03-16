"use strict";

var CryptoJS = require("crypto-js");

var key = "topdbjiu"; //秘钥必须为：8/16/32位
//加密

function encryptPwd(message) {
  var encrypt = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return String(encrypt);
} //解密


function decryptPwd(message) {
  var decrypt = CryptoJS.AES.decrypt(message, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}

decryptPwd("GjYMY7yt9PYqq4e/LmzGvg==");
decryptPwd("62DDofPMItWN4kafTHCPMA==");
decryptPwd("oClp9gLUmhDzXBuBtydzlQ==");
module.exports = {
  encryptPwd: encryptPwd,
  decryptPwd: decryptPwd
};