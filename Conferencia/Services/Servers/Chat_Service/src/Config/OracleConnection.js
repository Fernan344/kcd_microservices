const oracledb = require('oracledb')

credentials = {
    user: process.env.Oracle_User,
    password: process.env.Oracle_Pass,
    connectString: process.env.Oracle_Dsn
}

try {
    oracledb.initOracleClient({libDir: '/opt/oracle/instantclient_19_3'})
    console.log("Oracle Connected!!!")
}catch (err) {
    console.error('No Se Establecio La Conexion')
}

async function Open(query, binds, autoCommit){
    let connection = await oracledb.getConnection(credentials);
    let result = await connection.execute(query, binds, {autoCommit})
    connection.release();
    return result;
}

exports.Open = Open;