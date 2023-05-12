const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class Device extends Model {} ;
const attribute = {
    sh_id : DataTypes.STRING(8),
    location : DataTypes.STRING, 
    type : DataTypes.STRING, 
    no : DataTypes.INTEGER
};
const options = {
    sequelize, 
    tableName : 'device',
    timestamps : false, 
    indexes : [
        {
            name : 'shid_index', 
            fields : [ 'sh_id' ]
        }
    ]
};

Device.init(attribute, options);
Device.sync();

exports.Device = Device;