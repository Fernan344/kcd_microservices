const DB = require('../Config/OracleConnection');
const moment = require('moment');

exports.index = async (req, res) => {    
    res.json({ Saludo: "Hello Kubernetes!!!" })
}

exports.getMessages = async (req, res) => {
    try{
        const {idEmisor, idReceptor} = req.body
        let query = `SELECT * FROM TABLE(get_messages(${idEmisor}, ${idReceptor}))`;
        let result = await DB.Open(query, [], false);
        let data = []
        data = result.rows.map(item => {            
            let itemSchema = {
                "mensaje": item[0],
                "idEmisor": item[1],
                "idReceptor": item[2],
                "fecha": item[3]
            }
            return itemSchema
        })
        res.json(data)
    }catch(error){
        console.log(error)
        res.json([])
    }
}

exports.getUsers = async (req, res) => {
    try{
        let query = `SELECT * FROM TABLE(get_users())`;
        let result = await DB.Open(query, [], false);
        let data = []
        data = result.rows.map(item => {            
            let itemSchema = {
                "id": item[0],
                "user": item[1]
            }
            return itemSchema
        })
        res.json(data)
    }catch(error){
        console.log(error)
        res.json([])
    }
}

exports.sendMessage = async (req, res) => {
    try{
        const { message, emisor, receptor } = req.body
        var actual = moment().format('YYYY-MM-DD hh:mm:ss')
        let query = `CALL INSERT_MESSAGE('${message}', ${emisor}, ${receptor}, TIMESTAMP '${actual}')`;
        await DB.Open(query, [], true);
        res.json({"sended": true})
    }catch(error){
        console.log(error)
        res.json({"sended": false})
    }
}

