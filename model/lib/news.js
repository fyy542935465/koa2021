const DB = require('../db')
const Sequelize = require('sequelize')
const moment = require('moment')

const News = DB.define('news', {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING, 
        field: 'title',
    },
    img_url: {
        type: Sequelize.STRING,
        field: 'img_url',
    },
    content: {
        type: Sequelize.STRING,
        field: 'content',
    },
    create_date: {
        type: Sequelize.STRING,
        field: 'create_date'
    }
},{
    timestamps: false,
    freezeTableName: true,
})
// 添加产品
exports.add = (img_url,title, content) => {
    return News.create({
        img_url,
        title,
        content,
        create_date:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    })
}

// 查询所有
exports.find = () => {
    return News.findAll({
        attributes:['id','title','img_url','create_date']
    })
}

// 编辑产品
exports.update = (id,img_url,title,content) => {
    return News.update({
        img_url,
        title,
        content,
        create_date:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    },{
        where:{
            id
        }
    })
}

// 根据id查询
exports.findById = (id) => {
    return News.findOne({
        where:{
            id
        }
    })
}

// 根据id删除
exports.deleteById = (id) => {
    return News.destroy({
        where:{
            id
        }
    })
}
