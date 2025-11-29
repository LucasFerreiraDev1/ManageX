import { BDLocalStorage } from "../../models/BDLocalStorage.js";

const session = new BDLocalStorage('session');

export function closeSession() {
    session.deleteSession();
    location.href = '../Login/';
}

export function sessionStart(page) {
    let getSession = session.getSession();
    let validateSession = getSession.find(s => s.status === true);

    switch(page) {
        case "app":
            if(!validateSession) {
                location.href = '../Login/';
            }
            break;
        case "auth":
            if(validateSession) {
                location.href = '../Pending/';
            }
            break;
        default:
            console.error('Parâmetro sessionStart não informado!');
            break;
    }
}