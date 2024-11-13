let dataDownload = null; // Variable para almacenar los datos descargados


// Elementos del DOM
const inputUrl = document.getElementById('url');
const form = document.getElementById('form');
const resultado = document.getElementById('resultado');
const alertas = document.getElementById('alertas');
const btnDescargar = document.getElementById('btnDescargar');
const btnGenerar = document.getElementById('btnGenerar');

// Configuración de alertas
// este objeto contiene información sobre los iconos y colores de las alertas
// para facilitar la creación de las mismas
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

// Lista de APIs soportadas
const apis = [
    'https://rickandmortyapi.com/api/character'
]


// Una vez que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    inputUrl.placeholder = apis[Math.floor(Math.random() * apis.length)]; // Colocar una URL aleatoria en el placeholder

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const api_url = inputUrl.value; // Obtener la URL ingresada por el usuario

        const response = await fetch(api_url); // Realizar la petición a la URL

        if (!response.ok) { // Si la respuesta no es exitosa
            btnDescargar.disabled = true; // Deshabilitar el botón de descarga
            return crearAlert('Error al intentar acceder a la URL', 'danger'); // Mostrar una alerta de error
        }
        generarLoader(); // Mostrar un loader mientras se cargan los datos
        const data = await response.json(); // Convertir la respuesta a JSON

        dataDownload = data; // Almacenar los datos en la variable dataDownload
        btnDescargar.disabled = false; // Habilitar el botón de descarga

        const url = new URL(api_url); // Crear una instancia de URL con la URL ingresada
        const host = url.host; // Obtener el host de la URL ejemplo: https://rickandmortyapi.com/api/character -> rickandmortyapi.com

        switch (host) {
            case 'rickandmortyapi.com': // Si el host es rickandmortyapi.com
                if (data && data.results) {
                    renderRickAndMorty(data); // Renderizar los datos de la API de Rick and Morty
                } else {
                    renderRickAndMortyDetalle(data); // Renderizar los datos de un personaje específico
                }
                break;
            default:
                renderDefault(data); // Renderizar los datos por defecto
                return crearAlert('API no soportada', 'info'); // Mostrar una alerta de información
        }

        crearAlert('Datos cargados correctamente'); // Mostrar una alerta de éxito, solo sino entra en default del switch
    })

    // Evento click del botón de descarga
    btnDescargar.addEventListener('click', async function () {
        if (dataDownload) { // Si hay datos almacenados en la variable dataDownload
            descargarArchivo(dataDownload); // Descargar los datos
        }
    })

    btnGenerar.addEventListener('click', generarUrl); // Evento click del botón de generar URL, (que esten en la lista de apis)

});



// Funciones

// Función para generar una URL aleatoria basada en la lista de APIs soportadas
function generarUrl() {
    inputUrl.value = apis[Math.floor(Math.random() * apis.length)];
}

// Función para mostrar un loader mientras se cargan los datos
function generarLoader() {
    resultado.innerHTML = ''; // Limpiar el contenido del resultado
    const loader = document.createElement('div'); // Crear un elemento div
    loader.classList.add('spinner-border', 'text-primary'); // Agregar clases al elemento
    loader.role = 'status'; // Agregar atributos al elemento, Opcional
    resultado.appendChild(loader);  // Agregar el loader al resultado
}

// Función para descargar un archivo
function descargarArchivo(data) { // Recibe un objeto JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); // Crear un blob con los datos
    // el blob es un objeto que representa un archivo inmutable de datos binarios
    // nos permite crear un archivo en memoria

    const url = URL.createObjectURL(blob); // Crear una URL a partir del blob
    // esta URL es un enlace temporal a un archivo en memoria

    const a = document.createElement('a'); // Crear un elemento a
    a.href = url; // Agregar la URL al atributo href del elemento a
    a.download = `data-${Date.now()}.json`; // Agregar un nombre de archivo al atributo download del elemento a
    // el atributo download indica al navegador que el recurso a descargar debe guardarse en lugar de abrirse
    // y el valor de este atributo es el nombre del archivo
    a.click(); // Simular un click en el elemento a

    URL.revokeObjectURL(url); // Liberar la URL creada
}

// Función para crear una alerta
function crearAlert(mensaje, tipo = 'success') {
    const alertElement = document.createElement('div'); // Crear un elemento div

    const { icon, color } = alertConfig[tipo] || alertConfig.info; // Obtener el icono y el color, según el tipo de alerta
    // si el tipo de alerta no existe, se asigna el icono y color de una alerta de información

    alertElement.classList.add('alert', `alert-${color}`); // Agregar clases al elemento

    const iconElement = document.createElement('i'); // Crear un elemento i, que representa un icono
    iconElement.classList.add('bi', icon, 'flex-shrink-0', 'me-2');  // Agregar clases al elemento
    // las clases bi y flex-shrink-0 son de Bootstrap Icons

    alertElement.appendChild(iconElement); // Agregar el icono al elemento

    const textElement = document.createElement('span'); // Crear un elemento span para el texto
    textElement.textContent = mensaje; // Agregar el mensaje al texto
    alertElement.appendChild(textElement); // Agregar el texto al elemento

    alertas.textContent = ''; // Limpiar el contenido de las alertas
    alertas.appendChild(alertElement); // Agregar la alerta al contenedor de alertas
}

// Funciones de renderizado de datos por defecto
function renderDefault(data) {
    resultado.innerHTML = ''; // Limpiar el contenido del resultado
    const pre = document.createElement('pre'); // Crear un elemento pre
    // el elemento pre representa texto preformateado
    // es decir, texto en el que se respetan los espacios y saltos de línea

    pre.textContent = JSON.stringify(data, null, 2); // Agregar los datos al elemento pre
    // el método JSON.stringify convierte un objeto o valor de JavaScript en una cadena de texto JSON
    // el segundo argumento es una función de reemplazo, en este caso, null ya que no se requiere
    // el tercer argumento es el número de espacios para la indentación

    resultado.appendChild(pre); // Agregar el elemento pre al resultado
}

// Funciones de renderizado de datos de la API de Rick and Morty
function renderRickAndMorty(data) {
    const url = new URL(data.info.next); // Crear una instancia de URL con la URL de la siguiente página

    if (!url.pathname.endsWith('character')) { // Si la URL no termina con 'character' (es decir, no es un endpoint de personajes)
        // se asume que es un endpoint no soportado
        crearAlert("Endpoint no soportado", 'info'); // Mostrar una alerta de información
        return renderDefault(data); // Renderizar los datos por defecto, y terminar la ejecución de la función
    }
    // en caso contrario, se asume que es un endpoint de personajes

    resultado.innerHTML = '';  // Limpiar el contenido del resultado
    const table = document.createElement('table'); // Crear un elemento table
    table.classList.add('table', 'table-striped'); // Agregar clases al elemento

    const thead = document.createElement('thead'); // Crear un elemento thead
    thead.innerHTML = `
        <tr>
            <th>Id</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Genero</th>
            <th>Estado</th>
        </tr>
    `; // Agregar el contenido al elemento thead
    // en este caso usamos innerHTML para agregar el contenido de las celdas de la fila

    table.appendChild(thead); // Agregar el elemento thead al elemento table

    const tbody = document.createElement('tbody'); // Crear un elemento tbody

    // la data contiene un array de personajes en la propiedad results

    // recorremos el array de personajes de la propiedad results
    data.results.forEach(personaje => {
        // por cada personaje, creamos una fila de la tabla
        const tr = document.createElement('tr'); // Crear un elemento tr
        tr.innerHTML = `
            <td>${personaje.id}</td>
            <td><img src="${personaje.image}" alt="${personaje.name}" class="rounded-circle" width="50"></td>
            <td>${personaje.name}</td>
            <td>${personaje.species}</td>
            <td>${personaje.gender}</td>
            <td>${personaje.status}</td>
        `; // Agregar el contenido al elemento tr,
        // en este caso usamos innerHTML para agregar el contenido de las celdas de la fila
        // y usamos interpolación de cadenas para agregar los valores de las propiedades del personaje

        tbody.appendChild(tr); // Agregar el elemento tr al elemento tbody
    });

    // una vez recorrido el array de personajes, agregamos el elemento tbody al elemento table


    table.appendChild(tbody); // Agregar el elemento tbody al elemento table
    resultado.appendChild(table); // Agregar el elemento table al resultado
}

// Función para renderizar los datos de un personaje específico
function renderRickAndMortyDetalle(data) {
    if (!data.image || !data.species) { // Si no hay imagen o especie en los datos, se asume que no es un personaje
        crearAlert("Endpoint no soportado", 'info'); // Mostrar una alerta de información
        return renderDefault(data); // Renderizar los datos por defecto, y terminar la ejecución de la función
    }
    // en caso contrario, se asume que es un personaje

    resultado.innerHTML = ''; // Limpiar el contenido del resultado
    const card = document.createElement('div'); // Crear un elemento div
    card.classList.add('card'); // Agregar clases al elemento
    card.style.width = '18rem'; // Agregar un ancho al elemento

    const img = document.createElement('img'); // Crear un elemento img
    img.src = data.image; // Agregar la imagen al atributo src del elemento img
    img.alt = data.name; // Agregar el nombre al atributo alt del elemento img
    img.classList.add('card-img-top'); // Agregar clases al elemento
    card.appendChild(img); // Agregar el elemento img al elemento card

    const cardBody = document.createElement('div'); // Crear un elemento div
    cardBody.classList.add('card-body'); // Agregar clases al elemento
    card.appendChild(cardBody); // Agregar el elemento cardBody al elemento card

    const title = document.createElement('h5'); // Crear un elemento h5
    title.classList.add('card-title', 'text-capitalize'); // Agregar clases al elemento
    title.textContent = data.name; // Agregar el nombre al texto del elemento
    cardBody.appendChild(title); // Agregar el elemento title al elemento cardBody

    const species = document.createElement('p'); // Crear un elemento p
    species.classList.add('card-text'); // Agregar clases al elemento
    species.innerHTML = `<strong>Especie:</strong> ${data.species}`; // Agregar el texto al elemento
    cardBody.appendChild(species); // Agregar el elemento species al elemento cardBody

    const gender = document.createElement('p'); // Crear un elemento p
    gender.classList.add('card-text'); // Agregar clases al elemento
    gender.innerHTML = `<strong>Genero:</strong> ${data.gender}`; // Agregar el texto al elemento
    cardBody.appendChild(gender); // Agregar

    const status = document.createElement('p'); // Crear un elemento p
    status.classList.add('card-text'); // Agregar clases al elemento
    status.innerHTML = `<strong>Estado:</strong> ${data.status}`; // Agregar el texto al elemento
    cardBody.appendChild(status); // Agregar el elemento status al elemento cardBody

    resultado.appendChild(card); // Agregar el elemento card al resultado
}
