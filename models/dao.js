const {Op} = require('sequelize');
const { UserAccount } = require(`./UserAccount.js`);
const { Location } = require(`./Location.js`);
const { Device } = require(`./Device.js`);
const { ADL } = require(`./ADL.js`);
const { ADLMV } = require(`./ADLMV.js`);
const { RawADLData } = require(`./RawADLData.js`);
const { RawADLEnv } = require(`./RawADLEnv.js`);
const { ADLEnv } = require(`./ADLEnv.js`);
const { ADLEvent } = require(`./ADLEvent.js`);
const { RawADLEvent } = require(`./RawADLEvent.js`);

const { RawADLSound } = require(`./RawADLSound.js`);
const { RawADLGridEye } = require(`./RawADLGridEye.js`);

async function createRawADLSound(data)
{
    await RawADLSound.create(data);
}

async function createRawADLGridEye(data)
{
    await RawADLGridEye.create(data);
}

function getRawADLSound(attr, wh)
{
    return RawADLSound.findAll({
        attributes : attr, 
        where : wh
    });
}

function getRawADLGridEye(attr, wh)
{
    return RawADLGridEye.findAll({
        attributes : attr, 
        where : wh
    });
}

function createADL(data)
{
    return ADL.create(data);
}

async function createADLMV(data)
{
    return ADLMV.create(data);
}

async function createADLEnv(arrayData)
{    
    for ( const i in arrayData ) 
    {
        await ADLEnv.create(arrayData[i])
    }    
}

function createRawADLData(data)
{    
    return RawADLData.create(data);
}

function createRawADLEnv(data)
{
    return RawADLEnv.create(data);
}

function getUserAccount(userId)
{
    return UserAccount.findOne({
        attributes : [ 'userId', `password`, 'sh_id' ], 
        where : {
            userId : userId
        }
    });
}

function getLocation(attributes, wh)
{
    return Location.findAll({
        attributes : attributes, 
        where : wh
    });
}

function getDevice(attributes, wh)
{
    return Device.findAll({
        attributes : attributes, 
        where : wh
    });
}

function getADLENV(shId, type, fromTime, toTime)
{
    return RawADLEnv.findAll({
        attributes : [`location`, [type, `value`], `time`], 
        where : {
            sh_id : shId, 
            time : {
                [Op.between] : [fromTime, toTime]
            }
        }
    });
}

function getADL(shId, fromDate, toDate)
{
    return ADL.findAll({ 
        attributes : [ 'id', 'location', 'time', 'type', 'value' ],
        where : {
            sh_id : shId, 
            time : {
                [Op.between] : [fromDate, toDate]                
            }
        }
    });
}

function getADLMVWithTimes(shId, from, to)
{
    return ADLMV.findAll({
        attributes : [ 'fromTime', 'toTime', `timeDiff`, 'fromLocation', 'toLocation'], 
        where : {
            sh_id : shId, 
            fromTime : {
                [Op.between] : [from, to]
            }
        }, 
        order :[ 
            ['toTime', 'ASC'] 
        ]       
    });
}

function getADLMV(shId, fromTime, toTime, fromLocation, toLocation)
{
    return ADLMV.findAll({
        attributes : [ 'fromTime', 'toTime', `timeDiff`, 'fromLocation', 'toLocation' ], 
        where : {
            sh_id : shId, 
            fromLocation : fromLocation, 
            toLocation : toLocation,
            fromTime : {
                [Op.between] : [fromTime, toTime]
            }
        }, 
        order :[ 
            ['toTime', 'ASC']
        ]       
    });
}

async function getRawADLData()
{
    const listADLData = await ADLData.findAll({
        order : [
            [`id`, `DESC`]
        ], 
        limit : 1000
    });
    return listADLData;
}

async function getRawADLEnv()
{
    const listADLEnvData = await RawADLEnv.findAll({
        order : [
            [`id`, `DESC`]
        ],
        limit : 1000
    });
    return listADLEnvData;
}

async function createADLEvent(data)
{
    ADLEvent.create(data);
}

async function getADLEvent(attr, wh)
{
    return await ADLEvent.findAll({
        attributes : attr, 
        where : wh
    });
}

async function createRawADLEvent(data)
{
    RawADLEvent.create(data);
}

async function getRawADLEvent(attr, wh)
{
    return RawADLEvent.findAll({
        attributes : attr, 
        where : wh
    });
}

async function createADLEventHis(data)
{
    return ADLEventHis.create(data);
}

async function getADLEventHis(attribute, wh)
{
    return ADLEventHis.findAll({
        attributes : attribute, 
        where : wh
    });
}

exports.createADL = createADL;
exports.createADLMV = createADLMV;
exports.createRawADLData = createRawADLData;
exports.createADLEnv = createADLEnv;
exports.createRawADLEnv = createRawADLEnv;
exports.createRawADLEvent = createRawADLEvent;
exports.createADLEvent = createADLEvent;
exports.createADLEventHis = createADLEventHis;

exports.createRawADLSound = createRawADLSound;
exports.createRawADLGridEye = createRawADLGridEye;

exports.getADL = getADL;
exports.getADLMV = getADLMV;
exports.getADLMVWithTimes = getADLMVWithTimes;
exports.getUserAccount = getUserAccount;
exports.getLocation = getLocation;
exports.getDevice = getDevice;
exports.getRawADLData = getRawADLData;
exports.getRawADLEnv = getRawADLEnv;
exports.getADLENV = getADLENV;
exports.getRawADLEvent = getRawADLEvent;
exports.getADLEvent = getADLEvent;
exports.getADLEventHis = getADLEventHis;

exports.getRawADLSound = getRawADLSound;
exports.getRawADLGridEye = getRawADLGridEye;