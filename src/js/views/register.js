import { notify, validateEmail, loading } from "../utils.js";
import { Register } from "../models/Register.js";

document.addEventListener('DOMContentLoaded', () => {

    const fieldName = document.querySelector('#name');
    const fieldEmail = document.querySelector('#email');
    const fieldPassword = document.querySelector('#password');
    const fieldConfirmPassword = document.querySelector('#confirmPassword');

    document.querySelector('#btnRegister').addEventListener('click', (event) => {
        event.preventDefault();

        const fields = [
            {element: fieldName, label: 'Nome'},
            {element: fieldEmail, label: 'E-mail'},
            {element: fieldPassword, label: 'Senha'},
            {element: fieldConfirmPassword, label: 'Confirmar Senha'}
        ];
        
        for(let field of fields) {
            if(field.element.value.length > 0) {
                field.element.style.borderColor = '#ffffff0d';
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
    
        if(fieldPassword.value !== fieldConfirmPassword.value) {
            notify('Algo deu errado!', 'As senhas deve ser Idênticas!', 'error');
            fieldPassword.style.borderColor = 'red';
            fieldConfirmPassword.style.borderColor = 'red';
            return;
        }

        let teste = [
            fieldName.value.toLowerCase(),
            fieldEmail.value.toLowerCase(),
            fieldPassword.value,
            fieldConfirmPassword.value
        ]

        let newRegister = new Register(
            fieldName.value.toLowerCase(),
            fieldEmail.value.toLowerCase(),
            fieldPassword.value
        );

        newRegister.register();
    });
});