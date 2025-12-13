import { notify, validateEmail } from "../../utils.js";
import { Login } from "../../models/Login.js";

document.addEventListener('DOMContentLoaded', () => {
    const fieldEmail = document.querySelector('#email');
    const fieldPassword = document.querySelector('#password');

    document.querySelector('#btnLogin').addEventListener('click', (event) => {
        event.preventDefault();
        const fields = [
            { element: fieldEmail, label: 'Email' },
            { element: fieldPassword, label: 'Password' }
        ];
        for(let field of fields) {
            if(field.element.value.length > 0) {
                field.element.style.borderColor = "#ffffff0d";
            }
            if(field.element.value.trim() === '') {
                notify('Atenção!', `Preencha o campo ${field.label}!`, 'warning');
                field.element.style.borderColor = 'red';
                return;
            }
        }
        if(!validateEmail(fieldEmail.value.toLowerCase())) {
            notify('Atenção!', 'E-mail inválido!', 'warning');
            fieldEmail.style.borderColor = 'red';
            return;
        }
        let newLogin = new Login(
            fieldEmail.value,
            fieldPassword.value
        );
        newLogin.login();
    });
});