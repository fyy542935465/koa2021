const DB = require('../db')
const Sequelize = require('sequelize')

const User = DB.define('user', {
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
    }
},{
    timestamps: false,
    freezeTableName: true,
})

// 匹配登录账号
exports.find = (account) => {
    return User.findOne({
        where:{
            account
        }
    })
}

// 根据id获取账号信息
exports.findById = (id) => {
    return User.findOne({
        where:{
            id
        }
    })
}