// Selección de elementos del DOM
const formularioEl = document.getElementById('formulario');
const inputEl = document.getElementById('api-url');
const notificacionEL = document.getElementById('notificacion');
const resultadoEl = document.getElementById('resultado');

// Función para mostrar notificaciones
function mostrarNotificacion(message, tipo = 'success') {
  notificacionEL.className = `alert alert-${tipo} d-block`;
  notificacionEL.textContent = message;

  setTimeout(() => {
    notificacionEL.className = 'alert d-none';
  }, 5000); // Oculta la notificación después de 5 segundos
}

async function obtenerDatosAPI(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    mostrarNotificacion('Datos cargados correctamente.', 'success');
    mostrarResultado(data);
  } catch (error) {
    mostrarNotificacion(`Error al cargar los datos: ${error.message}`, 'danger');
    resultadoEl.innerHTML = '<p class="text-danger mb-0">No se pudieron obtener los datos.</p>';
  }
}

// Evento de envío del formulario
formularioEl.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita la recarga de la página

  const url = inputEl.value.trim();

  // Validar que la URL no esté vacía y sea válida
  if (!url) {
    mostrarNotificacion('Por favor, ingresa una URL válida.', 'warning');
    return;
  }

  // Consumir la API
  obtenerDatosAPI(url);
});

function mostrarResultado(data) {
  resultadoEl.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
