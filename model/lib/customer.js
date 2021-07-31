const DB = require('../db')
const Sequelize = require('sequelize')
const moment = require('moment')
const Customer = DB.define('customer', {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING, 
        field: 'name', 
    },
    tel: {
        type: Sequelize.STRING,
        field: 'tel', 
    },
    address:{
        type: Sequelize.STRING, 
        field: 'address'
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

// 添加客户
exports.add = (name,tel,address) => {
    return Customer.create({
        name,
        tel,
        address
    })
}

// 根据手机号查询客户
exports.findbyTel = (tel) => {
    return Customer.findOne({
        where:{
            tel
        }
    })
}

// 查询所有客户
exports.findAll = () => {
    return Customer.findAll({
        attributes:['id','name','tel','address']
    })
}