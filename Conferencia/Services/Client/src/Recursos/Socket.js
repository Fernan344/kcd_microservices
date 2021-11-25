import io from 'socket.io-client'

let socket = io(`//${process.env.chat_host}:4000`, { transports : ['websocket']})

export default socket;