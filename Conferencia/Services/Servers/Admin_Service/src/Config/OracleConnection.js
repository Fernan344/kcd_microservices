const oracledb = require('oracledb')

credentials = {
    user: "Fernando",
    password: "201731087",
    connectString: "localhost/orcl18"
}

try {
    oracledb.initOracleClient({libDir: 'C:\\Oracle\\instantclient_21_3'})
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