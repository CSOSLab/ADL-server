const { httpServer } = require(`./server.js`);
const { Server } =  require('socket.io');

const mapADLSockets = new Map();
const mapADLMVSockets = new Map();
const mapADLENVSockets = new Map();
const mapADLEVENTSockets = new Map();

const path = process.env.SOCKET_URL_PATH; 
const io = new Server( httpServer, {
    path : path
} );

const nsADL = process.env.NAMESPACE_ADL_NOTIFIER;
const nsADLMV = process.env.NAMESPACE_ADLMV_NOTIFIER;
const nsADLENV = process.env.NAMESPACE_ADLENV_NOTIFIER;
const nsADLEVENT = process.env.NAMESPACE_ADLEVENT_NOTIFIER;

function NAME_ROOM(shId, roomId)
{
    return `${shId}:${roomId}`;
}

function sendADLUpdate(shId){

    io.of(nsADL).to( NAME_ROOM(shId, `ADL`) ).emit(`update_adl`);
}

function sendADLMVUpdate(shId)
{
    io.of(nsADLMV).to( NAME_ROOM(shId, `ADLMV`) ).emit(`update_adlmv`);
}

function sendADLEnvUpdate(shId)
{
    io.of(nsADLENV).to( NAME_ROOM(shId, `ADLENV`) ).emit(`update_adlenv`);
}

function sendADLEventUpdate(shId)
{
    io.of(nsADLEVENT).to( NAME_ROOM(shId, `ADLEVENT`) ).emit(`update_adlevent`);
}

function initSocket(socket, room, mapSockets)
{    
    socket.on('hello', (message) => {
        try {
            const mes = JSON.parse(message);
            const shId = mes.shId;            

            socket.join( NAME_ROOM(shId, room) );

            mapSockets.set(socket.id, shId);
        }
        catch ( err ) 
        {
            console.error(err);
        }
    });    

    socket.on(`disconnect`, (reason) => {

        const shId = mapSockets.get(socket.id);
        socket.leave( `${shId}:${room}` );

        mapSockets.delete(socket.id);
    });    
}

io.of(nsADL).on(`connection`, (socket) => {

    initSocket(socket, `ADL`, mapADLSockets);
});

io.of(nsADLMV).on(`connection`, (socket) => {

    initSocket(socket, `ADLMV`, mapADLMVSockets);
});

io.of(nsADLENV).on(`connection`, (socket) => {

    initSocket(socket, `ADLENV`, mapADLENVSockets);
})

io.of(nsADLEVENT).on(`connection`, (socket) => {

    initSocket(socket, `ADLEVENT`, mapADLEVENTSockets);
})

exports.sendADLUpdate = sendADLUpdate;
exports.sendADLMVUpdate = sendADLMVUpdate;
exports.sendADLEnvUpdate = sendADLEnvUpdate;
exports.sendADLEventUpdate = sendADLEventUpdate;
