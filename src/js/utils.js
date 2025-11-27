
export function notify(notifyHeader, notifyBody, notifyStyle) {

    if (document.querySelector('#notify')) {
        document.querySelector('#notify').remove();
    }

    let notify = document.createElement('div');
    notify.classList.add('notify');
    notify.id = 'notify';

    notify.innerHTML = `
        <header class="notify-header"></header>
        <div class="notify-body">
            <p>${notifyBody}</p>
        </div>
    `;

    document.body.appendChild(notify);

    setTimeout(() => {
        notify.style.top = '3%';
        notify.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        notify.style.top = '-100%';
        notify.style.opacity = '0';
        setTimeout(() => {
            notify.remove();
        }, 500);
    }, 2000);

    switch (notifyStyle) {
        case 'success':
            notify.classList.add('success');
            document.querySelector('.notify-header').innerHTML = `<i class="fa-solid fa-check"></i> ${notifyHeader}`;
            break;
        case 'error':
            notify.classList.add('error');
            document.querySelector('.notify-header').innerHTML = `<i class="fa-solid fa-bomb"></i> ${notifyHeader}`;
            break;
        case 'warning':
            notify.classList.add('warning');
            document.querySelector('.notify-header').innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${notifyHeader}`;
            break;
        default:
            notify.classList.add('success');
            document.querySelector('.notify-header').innerHTML = `<i class="fa-solid fa-check"></i> ${notifyHeader}`;
            break;
    }
}

export function loading(src, text) {
    let loading = document.createElement('div');
    if(document.querySelector('#loading')) {
        document.querySelector('#loading').remove();
    }
    loading.id = 'loading';
    loading.classList.add('loading');
    loading.innerHTML = `
        <img src="${src}" alt="Carregando...">
        <p>${text}</p>
    `;

    document.body.appendChild(loading);
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}