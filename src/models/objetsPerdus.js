const {Sequelize,DataTypes} = require('sequelize')

module.exports = (Sequelize,DataTypes) => {
    return Sequelize.define('ObjetPerdu',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        titre : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        image : {
            type : DataTypes.STRING,
            allowNull : false
        },
        userID : {
            type : DataTypes.INTEGER,
            allowNull : false
            // references :{
            //     model : 'User',
            //     key : 'id'
            // }
        }

    })
}