const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class UserAccount extends Model{};
const attribute = {
    userId : DataTypes.STRING(32), 
    password : DataTypes.STRING(32), 
    sh_id : DataTypes.STRING(8)
};
const options = {
    sequelize : sequelize, 
    tableName : 'user_account', 
    timestamps : false, 
    indexes : [
        {
            unique : true, 
            fields:['userId']
        }, 
        {
            unique : true, 
            fields:['sh_id']
        }
    ]
};

UserAccount.init(attribute, options);
UserAccount.sync();

exports.UserAccount = UserAccount;