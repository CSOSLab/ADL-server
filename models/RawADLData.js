const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class RawADLData extends Model{};
const attribute = {
    paar_id : DataTypes.STRING(8),  //
    sh_id : DataTypes.STRING(8), 
    service_id : DataTypes.STRING(8), //
    sp_id : DataTypes.STRING(8), //
    location : DataTypes.STRING(45),
    time : DataTypes.DATE, 
    device_type : DataTypes.STRING, 
    device_no : DataTypes.INTEGER, 
    device_action : DataTypes.STRING,    
    raw_data : DataTypes.STRING
}
const options = {
    sequelize, 
    tableName : 'raw_adl', 
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
            name : 'device_type_index',
            using: 'BTREE',
            fields : [ 'device_type']
        },
        {
            name : 'location_index',
            using: 'BTREE',
            fields : [ 'location']
        }
    ]
};

RawADLData.init(attribute, options)
RawADLData.sync()

exports.RawADLData = RawADLData