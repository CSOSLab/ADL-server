const dao = require('../models/dao.js');
const { sendADLUpdate, sendADLMVUpdate, sendADLEnvUpdate, sendADLEventUpdate} = require(`../server/socketServer.js`);

function handleADLData(adlData) 
{
    //**** fill this method body
}

async function handleADLSound(adlSoundData)
{
    try
    {
        await dao.createRawADLSound(adlSoundData);
    }
    catch(err)
    {
        console.error(err);
    }    
}

async function handleADLGridEye(adlGridEyeData)
{
    try{
        await dao.createRawADLGridEye( adlGridEyeData );
    }
    catch(err)
    {
        console.error(err);
    }
}

async function handleADLEventData(rADLEvent)
{   
    try{
        await dao.createRawADLEvent(rADLEvent);

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
    catch(err)
    {
        console.error(err);
    }
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
    } )
    .catch( (reason) => {

        console.error( reason );
    });
}

exports.handleADLData = handleADLData;
exports.handleADLEnvData = handleADLEnvData;
exports.handleADLEventData = handleADLEventData;

exports.handleADLSound = handleADLSound;
exports.handleADLGridEye = handleADLGridEye;
