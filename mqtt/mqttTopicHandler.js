const dao = require('../models/dao.js');
const { sendADLUpdate, sendADLMVUpdate, sendADLEnvUpdate, sendADLEventUpdate} = require(`../server/socketServer.js`);

function handleADLData(adlData) 
{
    //**** fill this method body
}

async function handleADLSound(adlSoundData)
{    
    await dao.createRawADLSound(adlSoundData);
}

async function handleADLGridEye(adlGridEyeData)
{
    await dao.createRawADLGridEye( adlGridEyeData );
}

async function handleADLEventData(rADLEvent)
{
    dao.createRawADLEvent(rADLEvent);

    const endTime = new Date(rADLEvent.time);    
    const startTime = new Date(rADLEvent.time);
    startTime.setSeconds( startTime.getSeconds() - rADLEvent.duration );

    const adlEvent = {
        sh_id : rADLEvent.sh_id, 
        location : rADLEvent.location, 
        start_time : startTime, 
        end_time : endTime, 
        adl_event : rADLEvent.event
    };

    await dao.createADLEvent(adlEvent);
    sendADLEventUpdate(adlEvent.sh_id);
}

function handleADLEnvData(adlEnvData)
{
    const data = {        
        sh_id : adlEnvData.sh_id,         
        location : adlEnvData.location, 
        time : adlEnvData.time, 
        pressure : adlEnvData.press,
        temperature : adlEnvData.temp, 
        humidity : adlEnvData.humid, 
        gas_raw : adlEnvData.gas_raw, 
        IAQ : adlEnvData.iaq, 
        static_IAQ : adlEnvData.s_iaq, 
        e_CO2 : adlEnvData.eco2, 
        b_VOC : adlEnvData.bvoc, 
        gas_percent : adlEnvData.gas_percent, 
        clear : adlEnvData.clear, 
        raw_data : adlEnvData.rawdata
    };

    dao.createRawADLEnv(data)
    .then( (value) => {
        
        sendADLEnvUpdate( value.sh_id );
    } );
}

exports.handleADLData = handleADLData;
exports.handleADLEnvData = handleADLEnvData;
exports.handleADLEventData = handleADLEventData;

exports.handleADLSound = handleADLSound;
exports.handleADLGridEye = handleADLGridEye;
