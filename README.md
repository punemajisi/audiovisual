audiovisual
-------
帮 CY 写的 Testing Prototype
### 思路
- 视频预览：backend 推流, 前端根据后端推流的链接访问视频
- 操作数据更新：前端记录完用户的操作后，发起 http 请求，访问后端的端口，端口执行数据库写入操作。
### 写在前面
在进行下列操作前，一定需要先安装 NPM 包。具体操作就是进入 testVD 和 backend 的目录运行
`npm install --save`
### 关于开发模式和部署模式
- 开发模式
  - 运行
    - 前端 `npm run dev`
    - 后端 `node app.js`
    - 前端 `methods()` 下 `created()` 第一行 `this.base` 为 `http://localhost:3000/` 本地
  - 测试模式无法进行数据更新 （HTTP无法跨域）
    - 但是可以进行视频添加等，由于 npm run dev 可以实时更新
  - 通过 `127.0.0.1:8080` 访问主界面
- 部署模式
  - 确认 base 为 ''
  - 运行
    - 在前端 `npm run build` 
      - 将产生的 dist 文件夹下的文件复制到 后端 `public` 下
    - 后端运行 `node app.js`
  - 通过 `127.0.0.1:3000` 访问

### 如何建立数据库
1. 在本地安装 mysql，并记录下用户名密码
2. 修改位于 `backend/DBCreator.js & DBUtil.js` 下标注为 default settings 的部分
3. 在本地数据库建立同名数据库
4. 运行一次 DBCreator `node DBCreator.js`
5. 数据库表会被自动创建
   1. 注意，如果数据库的字段性质发生了改变
      1. 添加新的字段不会出现问题
      2. 删除旧的字段可能会出现问题，需要及时保存
   
### 如何添加新的视频（如果目前没有专门的 manager）
1. 首先生成对应的 mp4 和 mp3 文件，建议将名称命名为同一个.例如 `test1.mp4` and `test1.mp3`
2. 将 mp4 和 mp3 放到 `backend/video` 和 `backend/audio` 下
3. 将文件名添加到 `backend/app.js` 中第六行的 `video_names` 中
4. 将视频缩略图添加到 `backend/public/images` 下
5. 重启服务器

### 数据格式
- 数据库（可以在 DBUtil 中查看）包含下列几个字段
  - video_name：视频名
  - actions：操作
    - actions 字符串用 ｜ 分割，每一组代表 {操作发生时的 video time}/{将视频前移动（正）/后移动了多少}
  - indicator：最终选择，1代表 Good Integration， 0 代表 bad integration
  - timestamp：提交的时间戳
  - （自添加字段）
    - created_at: 创建时间
    - updated_at: 更新时间（最新更新的时间）

### 关于开发
- 前端技术栈为 Vue-Cli + element UI
- 后端技术栈为 express + sequelize