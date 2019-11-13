const {Admin} = require('../models/admin')
const bcrypt = require('bcryptjs')
const qiniu = require('qiniu')
const qiniuConfig = require('../../config/config').qiniu;
const fs = require('fs');
const path = require('path');

// data access object
class AdminDao {
    // 创建用管理员
    static async createAdmin(v) {
        const hasAdmin = await Admin.findOne({
            where: {
                email: v.get('body.email'),
                deleted_at: null
            }
        });

        if (hasAdmin) {
            throw new global.errs.Existing('管理员已存在');
        }

        const admin = new Admin();
        admin.email = v.get('body.email');
        admin.password = v.get('body.password2');
        admin.nickname = v.get('body.nickname');

        admin.save();
    }

    // 验证密码
    static async verifyEmailPassword(email, plainPassword) {

        // 查询用户是否存在
        const admin = await Admin.findOne({
            where: {
                email
            }
        })

        if (!admin) {
            throw new global.errs.AuthFailed('账号不存在')
        }

        // 验证密码是否正确
        const correct = bcrypt.compareSync(plainPassword, admin.password);

        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }

        return admin
    }

    // 查询管理员信息
    static async getAdminInfo(id) {
        const scope = 'bh';
        // 查询管理员是否存在
        const admin = await Admin.scope(scope).findOne({
            where: {
                id
            }
        })

        if (!admin) {
            throw new global.errs.AuthFailed('账号不存在')
        }

        return admin
    }


    // 上传图片
    static async uploadImage(ctx) {
        const { accessKey, secretKey, scope } = qiniuConfig;
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope,
            expires: 7200,
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        const config = new qiniu.conf.Config();
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        const { file } = ctx.request.files;
        console.log('---file---', file, file.path);
        const data = fs.readFileSync(file.path);
        const base64str = Buffer.from(data, 'binary').toString('base64');
        const bafferData = Buffer.from(base64str, 'base64');
        const filename = Date.now() + path.extname(file.name).toLocaleLowerCase();
        const result = await new Promise((resolve, reject) => {
            formUploader.put(uploadToken, filename, bafferData, putExtra, (err, body, info) => {
                if (err) {
                    reject(err)
                }
                if (info.statusCode === 200) {
                    console.log(body);
                    resolve(body)
                } else {
                    reject('other error');
                }
            })
        });
        return result;
    }
}

module.exports = {
    AdminDao
}