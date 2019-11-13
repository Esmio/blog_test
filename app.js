const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const path = require('path');
const static = require('koa-static');

const catchError = require('./middlewares/exception')

const app = new Koa()

const staticPath = './static';

app.use(cors())
app.use(catchError)
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));
app.use(parser())

app.use(static(
  path.join(__dirname, staticPath)
));


InitManager.initCore(app)

app.listen(3000)
