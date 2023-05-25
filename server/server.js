
function main()
{
    require(`dotenv`).config();
    const express = require('express');
    const app = express();
    const requestHandler = require('./requestHandler.js');
    const ejs = require('ejs');

    const port = process.env.SERVER_PORT;
    const hostname = '0.0.0.0';

    app.set('view engine', 'ejs');

    app.use( express.static( `test` ) );

    //** */
    app.get(`/socket_test`, (req, res) => { 

        ejs.renderFile(`./views/sock_client.ejs`)
        .then( html => {

            res.send(html);
        });
    });

    app.put('/login', (req, res) => {

        requestHandler.onLogin(req, res);
    });

    app.get('/locations/:shId', (req, res) => {    

        requestHandler.onLocation(req, res);
    });

    app.get('/devices/:shId', (req, res) => {    

        requestHandler.onDevice(req, res);
    });

    app.get('/ADLs/:shId/', (req, res) => {    

        requestHandler.onADLs(req, res);
    });

    app.get('/ADLMVs/:shId/', (req, res) => {

        requestHandler.onADLMVs(req, res);
    });

    app.get(`/ADLMVHistory/:shId/`, (req, res) => {

        requestHandler.onADLMVHistory(req, res);
    });

    app.get(`/ADLENV/:shId/:type`, (req, res) => {

        requestHandler.onADLENV(req, res);
    });

    app.get(`/RAW_ADLData`, (req, res) => {

        requestHandler.onRawADLData( req, res);    
    });

    app.get(`/RAW_ADLENV`, (req, res) => {

        requestHandler.onRawADLENV(req, res);
    });

    app.get(`/ADL_EVENTs/:shId`, (req, res) => {

        requestHandler.onADLEvents(req, res);
    });

    app.get(`/RAW_ADL_SOUND`, (req, res) => {

        requestHandler.onRawADLSound(req, res);
    });

    app.get(`/RAW_ADL_GRIDEYE`, (req, res) => {

        requestHandler.onRawADLGridEye(req, res);        
    });

    const httpServer = app.listen(port, hostname, () => {
        console.log('listen connections.');

        require(`./socketServer.js`);
        require(`../mqtt/mqttClient.js`);
    });

    exports.httpServer = httpServer;

}

if ( require.main === module )
{
    main();
}

