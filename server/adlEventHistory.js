const {Op} = require(`sequelize`);
const dao = require(`../models/dao`);

function createADLEvent(shId, location, time, type, event)
{
    return {
        sh_id : shId, 
        location : location, 
        time : time, 
        type : type, 
        value : event 
    };
}

async function getADLEvent(shId, from, to)
{
    const adlEventHistory = []; 
    
    const adlEvents = await dao.getADLEvent( 
        [`location`, `start_time`, `end_time`, `adl_event`, `state`], 
        {
            sh_id : shId, 
            start_time : {                
                [Op.between] : [ from, to ]
            }
        }
    );

    adlEvents.forEach( (event, index, array) =>{

        const sEvent = createADLEvent( event.sh_id, event.location, event.start_time, `start`, event.adl_event); 
        const eEvent = createADLEvent( event.sh_id, event.location, event.end_time, `end`, event.adl_event); 

        adlEventHistory.push(sEvent);
        adlEventHistory.push(eEvent);
    } );

    return adlEventHistory;
}

exports.getADLEvent = getADLEvent;