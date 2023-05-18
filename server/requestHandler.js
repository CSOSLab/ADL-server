const dao = require('../models/dao.js');
const ejs = require(`ejs`);
const { makeMoveHistoryData } = require(`./moveHistory.js`);
const { getADLEvent } = require(`./adlEventHistory.js`);

function formData(content)
{
    const data = {
        data : content
    };
    return data;
}

function sendResponseWithMessage(resCode, mes, res)
{
    const messageObj = {
        message : mes
    };
    return res.status(resCode).json( JSON.stringify( messageObj ));
}

function onLogin(req, res)
{
    try {
        const loginInput = JSON.parse(req.body);
        dao.getUserAccount(loginInput.user_id)
        .then( (userAccount) => {
            if( userAccount ) 
            {
                if( userAccount.password === loginInput.password )
                {
                    const login_ok = {
                        sh_id : userAccount.sh_id
                    };
                    return res.status(200).json( JSON.stringify( login_ok ) );
                }
                else 
                {
                    return sendResponseWithMessage(400, `사용자 정보가 틀렸습니다.`, res);
                }
            }
            else {
                return sendResponseWithMessage(204, `사용자 정보가 없습니다.`, res);
            }
        });        
    }
    catch (error) {

        return sendResponseWithMessage(400, `wrong request body`, res);
    }
}

function onLocation(req, res)
{
    const shId = req.params.shId;
    dao.getLocation(
        [`sh_id`, `location`], 
        {
            sh_id : shId
        }
    )
    .then( (listData) => {

        const data = formData(listData);
        res.status(200).json( JSON.stringify(data) );
    })
    .catch( (err) => {
        
        console.error(err);
        sendResponseWithMessage(500, `서버 오류`, res);
    });
}

function onDevice(req, res)
{
    const shId = req.params.shId;
    dao.getDevice(
        [ 'sh_id', 'location', 'type', 'no'], 
        {
            sh_id : shId
        }
    )
    .then( (listData) => {

        const data = formData(listData);
        res.status(200).json( JSON.stringify(data) );
    })
    .catch((err) => {

        console.error(err);
        sendResponseWithMessage(500, `서버 오류`, res);
    });
}

function onADLs(req, res)
{
    if( req.query.fromTime === undefined || 
        req.query.toTime === undefined ) 
    {
        return sendResponseWithMessage(400, `쿼리 값을 찾을 수 없습니다.`, res);
    }

    const shId = req.params.shId;
    const from = new Date( req.query.from );
    const to = new Date( req.query.to );   

    dao.getADL(shId, from, to)
    .then( (listData) =>  {

        const data = formData(listData);       
        res.status(200).json( JSON.stringify( data ) );
    })
    .catch( (err) => {

        console.error(err);
        sendResponseWithMessage(500, `서버 오류`, res);
    });
}

function onADLENV(req, res)
{
    if( req.query.fromTime === undefined || 
        req.query.toTime === undefined ) 
    {
        return sendResponseWithMessage(400, `쿼리 값을 찾을 수 없습니다.`, res);
    }

    const shId = req.params.shId;
    const type = req.params.type;
    const fromTime = new Date( req.query.fromTime );
    const toTime = new Date( req.query.toTime );
    
    dao.getADLENV(shId, type, fromTime, toTime)
    .then( (listData) => {

        const data = formData(listData);
        res.status(200).json( JSON.stringify( data ) );
    })
    .catch( (err) => {
        
        console.error(err);
        sendResponseWithMessage(500, `서버 오류`, res);    
    });
}

function onADLMVs(req, res)
{
    if( req.query.fromTime === undefined || 
        req.query.toTime === undefined || 
        req.query.fromLocation === undefined || 
        req.query.toLocation === undefined ) 
    {
        return sendResponseWithMessage(400, `쿼리 값을 찾을 수 없습니다.`, res);        
    }

    const shId = req.params.shId;
    const fromTime = new Date( req.query.fromTime );
    const toTime = new Date( req.query.toTime );
    const fromLocation = req.query.fromLocation;
    const toLocation = req.query.toLocation;   

    dao.getADLMV(shId, fromTime, toTime, fromLocation, toLocation)
    .then( (listData) => {
        
        const data = formData( listData );
        res.status(200).json( JSON.stringify( data ) );
    })
    .catch( (err) => {

        console.error(err);
        sendResponseWithMessage(500, `서버 오류`, res);
    });    
}

function onADLMVHistory(req, res)
{
    if( req.query.fromTime == undefined || 
        req.query.toTime == undefined ) 
    {
        return sendResponseWithMessage(400, `쿼리 값을 찾을 수 없습니다.`, res);        
    }

    const shId = req.params.shId;
    const fromTime = new Date( req.query.fromTime );
    const toTime = new Date( req.query.toTime );    

    dao.getADLMVWithTimes(shId, fromTime, toTime)
    .then( (listData) => {

        const moveHistory = makeMoveHistoryData(listData);
        const data = formData( moveHistory );
        res.status(200).json( JSON.stringify( data ));
    })
    .catch( (err) => {

        console.error( err );
        sendResponseWithMessage(500, `서버 오류`, res);
    });
}

async function onADLEvents(req, res)
{
    if( req.query.fromTime == undefined || 
        req.query.toTime == undefined ) 
    {
        return sendResponseWithMessage(400, `쿼리 값을 찾을 수 없습니다.`, res);        
    }

    const shId = req.params.shId;
    const fromTime = new Date( req.query.fromTime );
    const toTime = new Date( req.query.toTime );

    const listData = await getADLEvent(shId, fromTime, toTime);
    const data = formData( listData );
    res.status(200).json( JSON.stringify( data ));

    console.log( JSON.stringify( listData ) );
}

//****
async function onRawADLData(req, res)
{
    const heads = [
        `id`,
        `paar_id`,
        `sh_id`,
        `service_id`, 
        `sp_id`, 
        `location`, 
        `time`, 
        `device_type`, 
        `device_no`, 
        `device_action`, 
        `raw_data`
    ];

    try {
        const listData = await dao.getRawADLData();
        const data = {
            heads : heads,
            listData : listData
        };

        const html = await ejs.renderFile(`./views/adl_data.ejs`, data);
        return res.status(200).send(html);
    }
    catch(err) 
    {
        console.error( err ); 
        return sendResponseWithMessage(500, `서버 오류.`, res);
    }
}

//****
async function onRawADLENV(req, res)
{
    const heads = [
        `id`,
        `sh_id`,
        `location`, 
        `time`, 
        `pressure`,
        `temperature`,
        `humidity`,
        `gas_raw`,
        `IAQ`,
        `static_IAQ`,
        `e_CO2`,
        `b_VOC`,
        `gas_percent`,
        `clear`,
        `raw_data`
    ];

    try {
        const listData = await dao.getRawADLEnv();
        const data = {
            heads : heads,
            listData : listData
        };

        const html = await ejs.renderFile(`./views/adl_env.ejs`, data); //**
        return res.status(200).send(html);
    }
    catch(err) 
    {
        console.error( err ); 
        return sendResponseWithMessage(500, `서버 오류.`, res);
    }
}

async function onRawADLSound(req, res)
{
    const heads = [
        `id`,
        `sh_id`,
        `location`, 
        `time`, 
        `inference_index`,
        `inference_result`,
        `counts`,
        `mean`
    ];

    try {
        const listData = await dao.getRawADLSound();
        const data = {
            heads : heads,
            listData : listData
        };

        const html = await ejs.renderFile(`./views/adl_sound.ejs`, data); //**
        return res.status(200).send(html);
    }
    catch(err) 
    {
        console.error( err ); 
        return sendResponseWithMessage(500, `서버 오류.`, res);
    }
}

async function onRawADLGridEye(req, res)
{
    const heads = [
        `id`,
        `sh_id`,
        `location`, 
        `time`, 
        `grideye_raw`
    ];

    try {
        const listData = await dao.getRawADLGridEye();
        const data = {
            heads : heads,
            listData : listData
        };

        const html = await ejs.renderFile(`./views/adl_grideye.ejs`, data); //**
        return res.status(200).send(html);
    }
    catch(err) 
    {
        console.error( err ); 
        return sendResponseWithMessage(500, `서버 오류.`, res);
    }
}

exports.onLogin = onLogin;
exports.onADLs = onADLs;
exports.onADLMVs = onADLMVs;
exports.onADLMVHistory = onADLMVHistory;
exports.onADLENV = onADLENV;
exports.onLocation = onLocation;
exports.onDevice = onDevice;
exports.onRawADLData = onRawADLData;
exports.onRawADLENV = onRawADLENV;
exports.onADLEvents = onADLEvents;

exports.onRawADLSound = onRawADLSound;
exports.onRawADLGridEye = onRawADLGridEye;