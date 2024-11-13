let dataDownload = null;

const inputUrl = document.getElementById('url');
const form = document.getElementById('form');
const resultado = document.getElementById('resultado');
const alertas = document.getElementById('alertas');
const btnDescargar = document.getElementById('btnDescargar');
const btnGenerar = document.getElementById('btnGenerar');

const alertConfig = {
    success: {
        icon: 'bi-check-circle-fill',
        color: 'success'
    },
    danger: {
        icon: 'bi-exclamation-triangle-fill',
        color: 'danger'
    },
    info: {
        icon: 'bi-info-circle-fill',
        color: 'info'
    }
}

const apis = [
    'https://pokeapi.co/api/v2/pokemon',
    'https://swapi.dev/api/people',
    'https://rickandmortyapi.com/api/character'
]

document.addEventListener('DOMContentLoaded', () => {
    inputUrl.placeholder = apis[Math.floor(Math.random() * apis.length)];
});

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const api_url = inputUrl.value;


    const response = await fetch(api_url);

    if (!response.ok) {
        btnDescargar.disabled = true;
        return crearAlert('Error al intentar acceder a la URL', 'danger');
    }
    generarLoader();
    const data = await response.json();
    dataDownload = data;
    const url = new URL(api_url);
    const host = url.host;

    btnDescargar.disabled = false;

    switch (host) {
        case 'pokeapi.co':
            if (data && data.results) {
                renderPokeApi(data);
            } else {
                renderPokeApiDetalle(data);
            }
            break;
        case 'swapi.dev':
            if (data && data.results) {
                renderSwapi(data);
            } else {
                renderSwapiDetalle(data);
            }
            break;
        case 'rickandmortyapi.com':
            if (data && data.results) {
                renderRickAndMorty(data);
            } else {
                renderRickAndMortyDetalle(data);
            }
            break;
        default:
            renderDefault(data);
            return crearAlert('API no soportada', 'info');
    }

    crearAlert('Datos cargados correctamente');
})

btnDescargar.addEventListener('click', async function () {
    if (dataDownload) {
        descargarArchivo(dataDownload);
    }
})

btnGenerar.addEventListener('click', generarUrl);


function generarUrl() {
    const apisFiltered = apis.filter(api => api !== inputUrl.value);
    const url = apisFiltered[Math.floor(Math.random() * apisFiltered.length)];

    inputUrl.value = url;
}

function generarLoader() {
    resultado.innerHTML = '';
    const loader = document.createElement('div');
    loader.classList.add('spinner-border', 'text-primary');
    loader.role = 'status';
    resultado.appendChild(loader);
}


function descargarArchivo(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `data-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
}

function crearAlert(mensaje, tipo = 'success') {
    const alertElement = document.createElement('div');

    const { icon, color } = alertConfig[tipo] || alertConfig.info;
    alertElement.classList.add('alert', `alert-${color}`);

    const iconElement = document.createElement('i');
    iconElement.classList.add('bi', icon, 'flex-shrink-0', 'me-2');
    alertElement.appendChild(iconElement);

    const textElement = document.createElement('span');
    textElement.textContent = mensaje;
    alertElement.appendChild(textElement);

    alertas.textContent = '';
    alertas.appendChild(alertElement);
}

function renderDefault(data) {
    resultado.innerHTML = '';
    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(data, null, 2);
    resultado.appendChild(pre);
}

async function renderPokeApi(data) {
    const url = new URL(data.next);

    if (!url.pathname.endsWith('pokemon')) {
        crearAlert("Endpoint no soportado", 'info');
        return renderDefault(data);
    }

    resultado.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Id</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Altura</th>
            <th>Peso</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    const pokemons = await Promise.all(data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
    }));

    dataDownload = pokemons;

    pokemons.forEach(async (data) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${data.id}</td>
            <td><img src="${data.sprites.front_default}" alt="${data.name}" class="rounded-circle" width="50"></td>
            <td>${data.name}</td>
            <td>${data.types.map(t => t.type.name).join(', ')}</td>
            <td>${data.height / 10} m</td>
            <td>${data.weight / 10} kg</td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    resultado.appendChild(table);
}

function renderPokeApiDetalle(data) {
    if (!data.sprites || !data.types) {
        crearAlert("Endpoint no soportado", 'info');
        return renderDefault(data);
    }

    resultado.innerHTML = '';
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';

    const img = document.createElement('img');
    img.src = data.sprites.front_default;
    img.alt = data.name;
    img.classList.add('card-img-top');
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const title = document.createElement('h5');
    title.classList.add('card-title', 'text-capitalize');
    title.textContent = data.name;
    cardBody.appendChild(title);

    const types = document.createElement('p');
    types.classList.add('card-text');
    data.types.forEach(t => {
        const badge = document.createElement('span');
        badge.classList.add('badge', `bg-secondary`, 'me-1', 'text-capitalize');
        badge.textContent = t.type.name;
        types.appendChild(badge);
    });
    cardBody.appendChild(types);

    const row = document.createElement('div');
    row.classList.add('row');
    cardBody.appendChild(row);

    const col1 = document.createElement('div');
    col1.classList.add('col');
    col1.innerHTML = `<strong>Altura:</strong> ${data.height / 10} m`;
    row.appendChild(col1);

    const col2 = document.createElement('div');
    col2.classList.add('col');
    col2.innerHTML = `<strong>Peso:</strong> ${data.weight / 10} kg`;
    row.appendChild(col2);

    resultado.appendChild(card);
}

function renderSwapi(data) {
    const url = new URL(data.next);

    if (!url.pathname.includes('people')) {
        crearAlert("Endpoint no soportado", 'info');
        return renderDefault(data);
    }

    resultado.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Color de pelo</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    data.results.forEach(personaje => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${personaje.name}</td>
            <td>${personaje.height / 100} m</td>
            <td>${personaje.mass} kg</td>
            <td>${personaje.hair_color}</td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    resultado.appendChild(table);
}

function renderSwapiDetalle(data) {
    if (!data.hair_color) {
        crearAlert("Endpoint no soportado", 'info');
        return renderDefault(data);
    }

    resultado.innerHTML = '';
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const title = document.createElement('h5');
    title.classList.add('card-title', 'text-capitalize');
    title.textContent = data.name;
    cardBody.appendChild(title);

    const colorPelo = document.createElement('p');
    colorPelo.classList.add('card-text');
    colorPelo.innerHTML = `<strong>Color de pelo:</strong> ${data.hair_color}`;
    cardBody.appendChild(colorPelo);

    const row1 = document.createElement('div');
    row1.classList.add('row');
    cardBody.appendChild(row1);

    const col1 = document.createElement('div');
    col1.classList.add('col');
    col1.innerHTML = `<strong>Altura:</strong> ${data.height / 100} m`;
    row1.appendChild(col1);

    const col2 = document.createElement('div');
    col2.classList.add('col');
    col2.innerHTML = `<strong>Peso:</strong> ${data.mass} kg`;
    row1.appendChild(col2);


    resultado.appendChild(card);
}

function renderRickAndMorty(data) {
    const url = new URL(data.info.next);

    if (!url.pathname.endsWith('character')) {
        crearAlert("Endpoint no soportado", 'info');
        return renderDefault(data);
    }

    resultado.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Id</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Genero</th>
            <th>Estado</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    data.results.forEach(personaje => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${personaje.id}</td>
            <td><img src="${personaje.image}" alt="${personaje.name}" class="rounded-circle" width="50"></td>
            <td>${personaje.name}</td>
            <td>${personaje.species}</td>
            <td>${personaje.gender}</td>
            <td>${personaje.status}</td>
        `;
        tbody.appendChild(tr);
    });


    table.appendChild(tbody);
    resultado.appendChild(table);
}

function renderRickAndMortyDetalle(data) {
    if (!data.image || !data.species) {
        crearAlert("Endpoint no soportado", 'info');
        return renderDefault(data);
    }

    resultado.innerHTML = '';
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';

    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.name;
    img.classList.add('card-img-top');
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const title = document.createElement('h5');
    title.classList.add('card-title', 'text-capitalize');
    title.textContent = data.name;
    cardBody.appendChild(title);

    const species = document.createElement('p');
    species.classList.add('card-text');
    species.innerHTML = `<strong>Especie:</strong> ${data.species}`;
    cardBody.appendChild(species);

    const gender = document.createElement('p');
    gender.classList.add('card-text');
    gender.innerHTML = `<strong>Genero:</strong> ${data.gender}`;
    cardBody.appendChild(gender);

    const status = document.createElement('p');
    status.classList.add('card-text');
    status.innerHTML = `<strong>Estado:</strong> ${data.status}`;
    cardBody.appendChild(status);

    resultado.appendChild(card);
}

