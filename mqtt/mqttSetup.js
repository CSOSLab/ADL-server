const { 
    handleADLData, 
    handleADLEnvData,     
    handleADLEventData, 
    handleADLSound, 
    handleADLGridEye
} = require('./mqttTopicHandler.js');

module.exports = (mqttConnection) => {

    //* the list of published and subscribed mqtt topics */

    const TOPIC_ENV = process.env.MQTT_TOPIC_ADL_ADLENV;
    const TOPIC_ADL = process.env.MQTT_TOPIC_ADL_ADLDATA;
    const TOPIC_ADL_EVENT = process.env.MQTT_TOPIC_ADL_ADLEVENT;
    const TOPIC_ADL_SOUND = process.env.MQTT_TOPIC_ADL_ADLSOUND;
    const TOPIC_ADL_GRIDEYE = process.env.MQTT_TOPIC_ADL_ADLGRIDEYE;

    const topics = [
        TOPIC_ENV, //** for raw adl environment data  */
        TOPIC_ADL, //** for raw adl data */
        TOPIC_ADL_EVENT, //** for raw adl event data */
        TOPIC_ADL_SOUND, 
        TOPIC_ADL_GRIDEYE
    ];

    function handleError(err)
    {
        if( err ) 
        {
            console.error(err);
        }
    }

    function onConnect()
    {    
        console.log(`MQTT connection`);
        
        topics.forEach( (topic) => {
            mqttConnection.subscribe(topic, handleError);
        });        
    }

    function handle(topic, obj){

        if( topic == TOPIC_ADL )
        {   
            handleADLData(obj);
        }

        if( topic == TOPIC_ENV )
        {                           
            handleADLEnvData(obj); 
        }

        if( topic == TOPIC_ADL_EVENT )
        {
            handleADLEventData(obj);
        }

        if( topic == TOPIC_ADL_SOUND )
        {
            handleADLSound(obj);
        }

        if ( topic == TOPIC_ADL_GRIDEYE )
        {
            handleADLGridEye(obj);
        }
    }

    function onMessage(topic, msg)
    {
        console.log(`received an MQTT message : ${topic} `);        
        try {
            obj = JSON.parse(msg);
            handle(topic, obj);
        }
        catch(error) {
            console.error(error);
        }
    }

    mqttConnection.on("connect", onConnect);
    mqttConnection.on("message", onMessage);
}
