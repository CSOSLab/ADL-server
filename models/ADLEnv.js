const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class ADLEnv extends Model {} ;
const attribute = {
    sh_id : DataTypes.STRING(8),
    location : DataTypes.STRING,
    time : DataTypes.DATE, 
    type : DataTypes.STRING,
    value : DataTypes.FLOAT
};
const options = {
    sequelize : sequelize, 
    tableName : `adl_env`, 
    timestamps : false,
    indexes : [
        {
            name : 'comp_shid_time_type_index',
            using: 'BTREE',
            fields : [ 'sh_id', 'time', `type`]
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
        },
        {
            name : 'type_index',
            using: 'BTREE',
            fields : [ 'type' ]
        }, 
        {
            name : 'type_value',
            using: 'BTREE',
            fields : [ 'value' ]            
        }
    ]
};

ADLEnv.init(attribute, options);
ADLEnv.sync();

exports.ADLEnv = ADLEnv;