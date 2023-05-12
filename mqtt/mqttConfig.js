const mqtt = require("mqtt");

const mqttHost = process.env.MQTT_IP;
const portNumber = parseInt(process.env.MQTT_PORT);
const userName = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;

function createConnection()
{   
    const mqttConnection = mqtt.connect({
        host : mqttHost, 
        port : portNumber, 
        protocol: `mqtt`,
        username : userName, 
        password : password
    });
    return mqttConnection;
}

exports.createConnection = createConnection;
