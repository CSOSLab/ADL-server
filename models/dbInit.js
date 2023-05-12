const {Sequelize} = require('sequelize');

const host = process.env.DB_HOST_IP;
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_USERPASSWORD;
const portNumber = parseInt( process.env.DB_PORT ) ;

var sequelize = null;

function createConnection()
{
    sequelize = new Sequelize(database, username, password, {
        host : host,
        port : portNumber, 
        dialect : 'mysql',
        pool : {
            max : 10,
            min : 1,
            idle : 10000
        }
    });
}

function getConnection()
{
    if( sequelize == null )
    {
        createConnection();
    }

    return sequelize;
}

exports.getConnection = getConnection;