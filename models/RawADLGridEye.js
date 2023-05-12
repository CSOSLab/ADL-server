const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class RawADLGridEye extends Model{};
const attribute = {
    sh_id : DataTypes.STRING(8),
    location : DataTypes.STRING,
    time : DataTypes.DATE, 
    grideye_raw : DataTypes.INTEGER
};
const options = {
    sequelize, 
    tableName : 'raw_adl_grideye', 
    timestamps : false, 
    indexes : [
        {
            name : 'comp_index_a',
            using: 'BTREE',
            fields : [ 'sh_id', 'time', `location`]
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
            name : 'location',
            using: 'BTREE',
            fields : [ 'location']
        }
    ]
};

RawADLGridEye.init(attribute, options);
RawADLGridEye.sync();

exports.RawADLGridEye = RawADLGridEye;