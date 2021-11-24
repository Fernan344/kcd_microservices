const DB = require('../Config/OracleConnection');
const socketClass = require('../Recursos/Socket')
const moment = require('moment');

exports.sockets = async () => {
    io = socketClass.getSocket();       

    io.on('connection', (socket) => {            
        socket.on('sendMessage', async (msg)  => {
            try{
                const { message, emisor, receptor } = msg
                var actual = moment().format('YYYY-MM-DD hh:mm:ss')
                let query = `CALL INSERT_MESSAGE('${message}', ${emisor}, ${receptor}, TIMESTAMP '${actual}')`;
                await DB.Open(query, [], true);
                io.sockets.emit('receiveMessage', {"sended": true, "mensaje": message, "emisor": emisor, "receptor": receptor, "fecha": actual})
            }catch(error){
                console.log(error)
                io.sockets.emit('receiveMessage', {"sended": false})
            }
        })

        socket.on('newUsuario', async(msg) => {
            const { user } = msg
            let query = `SELECT GET_USER('${user}') FROM dual`;
            let result = await DB.Open(query, [], false);
            io.emit('addUser', {"user": user, "id": result.rows[0][0]})
        })
    })
}