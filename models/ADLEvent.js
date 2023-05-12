const { getConnection } = require('./dbInit.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = getConnection();

class ADLEvent extends Model {} ;
const attribute = {
    sh_id : DataTypes.STRING(8),
    location : DataTypes.STRING,
    start_time : DataTypes.DATE, 
    end_time : DataTypes.DATE, 
    adl_event : DataTypes.STRING,     
    state : DataTypes.STRING
};
const options = {
    sequelize : sequelize, 
    tableName : `adl_event`,
    timestamps : false,
    indexes : [
        {
            name : 'comp_index_a',
            using: 'BTREE',
            fields : [ 'sh_id', 'end_time', `adl_event`]
        },
        {
            name : 'shid_index',
            using: 'BTREE',
            fields : [ 'sh_id' ]
        },
        {
            name : 'start_time_index',
            using: 'BTREE',
            fields : [ 'start_time']
        },
        {
            name : 'end_time_index',
            using: 'BTREE',
            fields : [ 'end_time']
        }, 
        {
            name : 'state_index',
            using: 'BTREE',
            fields : [ 'state' ]
        }
    ]
};

ADLEvent.init(attribute, options);
ADLEvent.sync();

exports.ADLEvent = ADLEvent;