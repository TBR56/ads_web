// frontend/script.js
const apiBaseUrl = 'http://localhost:5000/api';

document.getElementById('registerLink').addEventListener('click', async () => {
    const name = prompt('Ingrese su nombre:');
    const email = prompt('Ingrese su email:');
    const password = prompt('Ingrese su contraseña:');
    await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    alert('Registro exitoso');
});

document.getElementById('loginLink').addEventListener('click', async () => {
    const email = prompt('Ingrese su email:');
    const password = prompt('Ingrese su contraseña:');
    const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (response.ok) {
        const data = await response.json();
        alert('Inicio de sesión exitoso');
        document.getElementById('userSection').classList.remove('d-none');
        document.getElementById('balance').innerText = `Saldo: $${data.balance}`;
        loadAds();
    } else {
        alert('Credenciales incorrectas');
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('userSection').classList.add('d-none');
});

async function loadAds() {
    const response = await fetch(`${apiBaseUrl}/ads`);
    const ads = await response.json();
    const adsList = document.getElementById('adsList');
    adsList.innerHTML = '';
    ads.forEach(ad => {
        const adDiv = document.createElement('div');
        adDiv.className = 'col-md-4 ad';
        adDiv.innerHTML = `
            <h3>${ad.title}</h3>
            <a href="${ad.url}" target="_blank" class="btn btn-primary">Ver Anuncio</a>
        `;
        adsList.appendChild(adDiv);
    });
}

loadAds();
