const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class RawADLEvent extends Model{};
const attribute = {
    sh_id : DataTypes.STRING(8),
    location : DataTypes.STRING,
    time : DataTypes.DATE, 
    event : DataTypes.STRING, 
    duration : DataTypes.FLOAT, 
    prob : DataTypes.FLOAT, 
    prob_raw : DataTypes.FLOAT
};
const options = {
    sequelize, 
    tableName : 'raw_adl_event', 
    timestamps : false, 
    indexes : [
        {
            name : 'comp_index_a',
            using: 'BTREE',
            fields : [ 'sh_id', 'time', `event`]
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
            name : 'event_index',
            using: 'BTREE',
            fields : [ 'event']
        }
    ]
};

RawADLEvent.init(attribute, options);
RawADLEvent.sync();

exports.RawADLEvent = RawADLEvent;