import { loading } from "../utils.js";
import { BDLocalStorage } from "./BDLocalStorage.js";
export class Register {
    constructor(name, email, password) {
        this.name = name,
        this.email = email,
        this.password = password,
        this.users = new BDLocalStorage('users'),
        this.allUsers = this.users.getLocalStorage()
    }

    register() {
        let newRegister = {
            name: this.name,
            email: this.email,
            password: this.password
        }
        let existingEmail = this.allUsers.find(user => user.email === this.email);
        if (existingEmail) {
            notify('Algo deu errado!', 'E-mail já cadastrado', 'error');
            return;
        }
        this.allUsers.push(newRegister);
        this.users.setLocalStorage(this.allUsers);
        loading('../../assets/loading.gif','Cadastrando usuário...');
        setTimeout(() => { location.href = '../Login/' }, 1300);
    }   
}