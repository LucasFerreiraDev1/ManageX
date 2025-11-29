import { BDLocalStorage } from "../models/BDLocalStorage.js";
import { notify, loading } from "../utils.js";

export class Login {

    constructor(email, password) {
        this.email = email,
        this.password = password,
        this.users = new BDLocalStorage('users'),
        this.allUsers = this.users.getLocalStorage(),
        this.session = new BDLocalStorage('session'),
        this.getSession = this.session.getLocalStorage()
    }
    
    login() {

        let validateLogin = this.allUsers.find(user => user.email === this.email);
        if(!validateLogin || validateLogin.password !== this.password) {
            notify('Algo deu errado!', 'O e-mail ou a senha informados não conferem. Por favor, tente novamente.', 'warning');
            return;
        }

        let sessionLogin = {
            email: this.email,
            status: true
        };

        this.getSession.push(sessionLogin);
        this.session.setSession(this.getSession);
        loading('../../assets/loading.gif','Efetuando login...');
        setTimeout(() => { location.href = '../Pending/' }, 2000);
    }
}