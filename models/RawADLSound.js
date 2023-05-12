const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class RawADLSound extends Model{};
const attribute = {
    sh_id : DataTypes.STRING(8),
    location : DataTypes.STRING,
    time : DataTypes.DATE, 
    inference_index : DataTypes.INTEGER, 
    inference_result : DataTypes.STRING, 
    counts : DataTypes.INTEGER, 
    mean : DataTypes.FLOAT
};
const options = {
    sequelize, 
    tableName : 'raw_adl_sound', 
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
            name : 'location_index',
            using: 'BTREE',
            fields : [ 'location']
        }
    ]
};

RawADLSound.init(attribute, options);
RawADLSound.sync();

exports.RawADLSound = RawADLSound;