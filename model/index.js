const DB = require('./db')
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
    user_name: {
        type: Sequelize.STRING, // 指定值的类型
        field: 'user_name', // 指定存储在表中的键名称
    },
    tel: {
        type: Sequelize.STRING, // 指定值的类型
        field: 'tel', // 指定存储在表中的键名称
    }
},{
    timestamps: false,
    freezeTableName: true,
})

exports.addUser = (userName, tel) => {
    // 向 user 表中插入数据
    return User.create({
        user_name: userName,
        tel: tel
    })
}

// 根据tel查询
exports.findByTel = tel => {
    return User.findOne({
        where: {
            tel
        }
    })
};

// 查询所有
exports.findAll = () => {
    return User.findAll({
        attributes:['id','user_name','tel']
    })
};

// 根据id查询修改username
exports.delete = id => {
    return User.destroy({
        where: {
            id
        }
    })
};