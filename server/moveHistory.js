const KEY_TIME_DIFF = `time_diff`;
const KEY_MOVE_FREQ = `move_freq`;

const KEY_FROM = `from`;
const KEY_GOALS = `goals`;

function addMoveInfo(map, from, to, timeDiff)
{
    let toMap = map[from];
    if( toMap == undefined ) 
    {
        toMap = new Map();
    }

    let infoMap = toMap[to];
    if( infoMap == undefined ) 
    {
        infoMap = new Map();
    }

    let accumTimeDiff = infoMap[ `time_diff` ];
    if( accumTimeDiff == undefined) 
    {
        accumTimeDiff = 0;
    }
    accumTimeDiff = accumTimeDiff + timeDiff;

    let accumMoveFreq = infoMap[ `move_freq` ];
    if( accumMoveFreq == undefined ) 
    {
        accumMoveFreq = 0;
    }
    accumMoveFreq++;
    
    infoMap[ `time_diff` ] = accumTimeDiff;
    infoMap[ `move_freq` ] = accumMoveFreq;
    toMap[ to ] = infoMap;
    map[ from ] = toMap;
}

function makeGoals(infoMap)
{
    var goals = [];
    for( toLocation in infoMap) 
    {
        const rawInfo = infoMap[toLocation];
        const moveFreq = rawInfo[`move_freq`];
        let avgTime = rawInfo[`time_diff`] / moveFreq;
        avgTime = Math.round(avgTime);

        const goal ={
            to : toLocation, 
            avg_time : avgTime,
            move_freq : moveFreq            
        };
        goals.push( goal );
    }

    return goals;
}

function makeMoveHistory(mapData)
{
    var mvHistory = [];
    for( fromLocation in mapData ) {
        const infoMap = mapData[ fromLocation ];
        
        var goal = {};
        goal[`from`] = fromLocation;    
        var listGoals = makeGoals(infoMap);
        goal[`goals`] = listGoals;
    
        mvHistory.push(goal);
    }
    return mvHistory;
}

function makeMoveHistoryData( listADLMVs )
{
    var mapData = new Map();
    for( i in listADLMVs ) 
    {
        const adlMV = listADLMVs[i];
        addMoveInfo(mapData, adlMV.fromLocation, adlMV.toLocation, adlMV.timeDiff);
    }

    var mvHistory = makeMoveHistory( mapData );
    var data = {};
    data[`mvHistory`] = mvHistory;
    data[`curLocation`] = findCurrentLocation( listADLMVs );

    return data;
}

//****
function findCurrentLocation(listADLMVs)
{
    const locations = [`거실`, `화장실`, `부억`, `안방`, `외출`];
    const i = Math.floor( Math.random() * 10 ) % locations.length;
    return locations[i] ;
}

exports.makeMoveHistoryData = makeMoveHistoryData;