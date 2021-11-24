const DB = require('../Config/OracleConnection');
const moment = require('moment');

exports.index = async (req, res) => {    
    res.json({ Saludo: "Hello Kubernetes!!!" })
}

exports.getAll = async (req, res) => {
    try{
        let query = `SELECT * FROM TABLE(get_all_messages())`;
        let result = await DB.Open(query, [], false);
        let data = []
        data = result.rows.map(item => {            
            let itemSchema = [
                item[0],
                item[1],
                item[2],
                item[3],
                item[4],
                item[5],
                item[6]
            ]
            return itemSchema
        })
        res.json(data)
    }catch(error){
        console.log(error)
        res.json([])
    }
}

