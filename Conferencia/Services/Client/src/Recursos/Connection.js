
export function getConnectionChat(){    
    return `http://${process.env.REACT_APP_CHAT_HOST}:4000`
}

export function getConnectionAdmission(){
    console.log(process.env.REACT_APP_ADMISSION_HOST)
    return `http://${process.env.REACT_APP_ADMISSION_HOST}:4500`
}

export function getConnectionAdmin(){
    return `http://${process.env.REACT_APP_ADMIN_HOST}:5000`
}