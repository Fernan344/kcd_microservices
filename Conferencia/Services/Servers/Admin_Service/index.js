const express = require('express')
const http = require('http')
const clientRouter = require('./src/Routes/Admin.Router')

const morgan = require('morgan');
const cors = require('cors')

const app = express()

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.use(morgan('dev'));
app.set('port', process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', clientRouter)

const httpServer = http.createServer(app);

httpServer.listen(app.get('port'), ()=>{
    console.log('server chambeando', app.get('port'));    
});