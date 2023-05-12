const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class ADLMV extends Model{};
const attribute = {
    sh_id : DataTypes.STRING(8), 
    fromTime : DataTypes.DATE, 
    toTime : DataTypes.DATE,
    timeDiff : DataTypes.FLOAT,   
    fromLocation : DataTypes.STRING, 
    toLocation : DataTypes.STRING
};
const options = {
    sequelize, 
    tableName : 'adl_mv',
    timestamps : false, 
    indexes : [
        {
            name : 'comp_shid_time_index',
            using: 'BTREE',
            fields : [ 'sh_id', 'fromTime']
        }, 
        {
            name : 'comp_index',
            using: 'BTREE',
            fields : [ 'sh_id', 'fromTime', `toTime`, `fromLocation`, `toLocation`]
        }, 
        {
            name : 'fromTime_index',
            using: 'BTREE',
            fields : [ 'fromTime']
        }, 
        {
            name : 'toTime_index',
            using: 'BTREE',
            fields : [ 'toTime']
        }
    ]
};

ADLMV.init(attribute, options)
ADLMV.sync()

exports.ADLMV = ADLMV