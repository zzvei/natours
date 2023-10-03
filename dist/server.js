const express = require('express');
const path = require('path');
const app = express();
const port = 2333;

// 托管静态文件
app.use(express.static(path.join(__dirname, 'dist')));

// 处理所有其他路由
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器正在运行，请访问 http://localhost:${port}`);
});
