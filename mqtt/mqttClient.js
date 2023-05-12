const mqttConfig = require('./mqttConfig.js');
const mqttConnection = mqttConfig.createConnection();

require('./mqttSetup.js')(mqttConnection);
