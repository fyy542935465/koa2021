const DB = require('../db')
const Sequelize = require('sequelize')
const moment = require('moment')

const About = DB.define('about', {
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
    content: {
        type: Sequelize.STRING,
        field: 'content',
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
// 添加公司简介
exports.add = (title, content) => {
    return About.create({
        title,
        content,
    })
}

// 查询
exports.find = () => {
    return About.findOne({
        attributes:['id','title','content','create_date']
    })
};

// 编辑公司简介
exports.update = (id,title,content) => {
    return About.update({
        title,
        content,
        create_date:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    },{
        where:{
            id
        }
    })
};