const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class RawADLEnv extends Model{};
const attribute = {
    sh_id : DataTypes.STRING(8), 
    location : DataTypes.STRING(45),
    time : DataTypes.DATE, 
    pressure : DataTypes.FLOAT, 
    temperature : DataTypes.FLOAT, 
    humidity : DataTypes.FLOAT, 
    gas_raw : DataTypes.FLOAT, 
    IAQ : DataTypes.FLOAT, 
    static_IAQ : DataTypes.FLOAT, 
    e_CO2 : DataTypes.FLOAT, 
    b_VOC : DataTypes.FLOAT, 
    gas_percent : DataTypes.FLOAT, 
    clear : DataTypes.FLOAT,
    raw_data : DataTypes.STRING
};
const options = {
    sequelize, 
    tableName : 'raw_adl_env', 
    timestamps : false, 
    indexes : [
        {
            name : 'sh_id_index',
            using: 'BTREE',
            fields : [ 'sh_id']
        }, 
        {
            name : 'time_index',
            using: 'BTREE',
            fields : [ 'time']
        },         
        {
            name : 'location_index',
            using: 'BTREE',
            fields : ['location']
        }
    ]
};

RawADLEnv.init(attribute, options);
RawADLEnv.sync();

exports.RawADLEnv = RawADLEnv;
