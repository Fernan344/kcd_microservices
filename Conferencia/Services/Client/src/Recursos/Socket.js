import io from 'socket.io-client'

let socket = io(`//${process.env.REACT_APP_CHAT_HOST}:4000`, { transports : ['websocket']})

export default socket;