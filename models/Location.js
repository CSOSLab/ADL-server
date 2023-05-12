const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class Location extends Model {} ;
const attribute = {
    sh_id : DataTypes.STRING(8),
    location : DataTypes.STRING
};
const options = {
    sequelize, 
    tableName : 'location',
    timestamps : false, 
    indexes : [
        {
            name : 'sh_id_index', 
            fields : [ 'sh_id' ]
        }
    ]
};

Location.init(attribute, options);
Location.sync();

exports.Location = Location;