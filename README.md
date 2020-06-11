Audiovisual
-------
### 思路
部署：backend 推流, 前端根据后端推流的链接访问
更新：直接在前端发起 http 请求，访问后端的端口，端口执行数据库写入操作
### backend run
cd backend, install packages
run with
```bash
node app.js
```
access with url in broswer
```A
http://localhost:3000/video/test.mp4
```

### Frontend Run
For the front end, `CD` to the `testVD` and type
```bash
npm install --save
```
to download all needed packages
```bash
npm run dev
```
to run in development mode, and 
```bash
npm run build
```
to build the file
