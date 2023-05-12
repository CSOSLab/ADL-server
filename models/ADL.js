const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class ADL extends Model{};
const attribute = {
    sh_id : DataTypes.STRING(8),
    location : DataTypes.STRING,
    time : DataTypes.DATE, 
    type : DataTypes.STRING, 
    value : DataTypes.STRING
};
const options = {
    sequelize, 
    tableName : 'adl', 
    timestamps : false, 
    indexes : [
        {
            name : 'comp_shid_time_index',
            using: 'BTREE',
            fields : [ 'sh_id', 'time']
        },
        {
            name : 'shid_index',
            using: 'BTREE',
            fields : [ 'sh_id' ]
        },
        {
            name : 'time_index',
            using: 'BTREE',
            fields : [ 'time']
        }
    ]
};

ADL.init(attribute, options);
ADL.sync();

exports.ADL = ADL;