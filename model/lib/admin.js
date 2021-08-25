const DB = require('../db')
const Sequelize = require('sequelize')
const moment = require('moment')
const Admin = DB.define('admin', {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    account: {
        type: Sequelize.STRING, // 指定值的类型
        field: 'account', // 指定存储在表中的键名称
    },
    password: {
        type: Sequelize.STRING, // 指定值的类型
        field: 'password', // 指定存储在表中的键名称
    },
    create_date: {
        type: Sequelize.STRING,
        field: 'create_date',
        defaultValue:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }
},{
    timestamps: false,
    freezeTableName: true,
})

// 添加管理员
exports.add = (account,password) => {
    return Admin.create({
        account,
        password,
        create_date:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    })
}

// 根据手机号查询
exports.findbyAccount = (account) => {
    return Admin.findOne({
        where:{
            account
        }
    })
}

// 查询所有
exports.findAll = () => {
    return Admin.findAll({
        attributes:['id','account','password','create_date']
    })
}