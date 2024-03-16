const copyDir = require('./copyDir'); // 调用拷贝目录方法
const path = require("path");


// 拷贝iconfont到
const sourcePath = path.resolve(__dirname, "../../dist"); // 源目录
const targetPath = path.resolve(__dirname, "../../../webServer/dist"); // 要移向的目录

copyDir(sourcePath, targetPath, err => {
    console.log("err", err);
})