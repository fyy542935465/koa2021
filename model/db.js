const Sequelize = require('sequelize')

const sequelize = new Sequelize('trzk', 'root', 'fyy123456', {
    // MySQL服务器地址
    host: '121.5.228.80',
    // MySQL服务器端口号
    port: 3306,
    // 注意点: Sequelize不仅仅能操作MySQL还能够操作其它类型的数据库
    // 告诉Sequelize当前要操作的数据库类型
    dialect: 'mysql',
    pool: {
        // 最多有多少个连接
        max: 5,
        // // 最少有多少个连接
        min: 0,
        // 当前连接多久没有操作就断开
        idle: 10000,
        // 多久没有获取到连接就断开
        acquire: 30000,
    }
});

sequelize.authenticate().then(()=>{
    console.log('数据库连接ok');
}).catch((err)=>{
    console.log(err);
});

module.exports = sequelize