// Selección de elementos del DOM
const form = document.getElementById('api-form');
const apiUrlInput = document.getElementById('api-url');
const notification = document.getElementById('notification');
const resultsContent = document.getElementById('results-content');

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
  notification.className = `alert alert-${type} d-block`;
  notification.textContent = message;

  setTimeout(() => {
    notification.className = 'alert d-none';
  }, 5000); // Oculta la notificación después de 5 segundos
}

async function fetchApiData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    showNotification('Datos cargados correctamente.', 'success');
    displayResults(data);
  } catch (error) {
    showNotification(`Error al cargar los datos: ${error.message}`, 'danger');
    resultsContent.innerHTML = '<p class="text-danger">No se pudieron obtener los datos.</p>';
  }
}

// Evento de envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita la recarga de la página

  const url = apiUrlInput.value.trim();

  // Validar que la URL no esté vacía y sea válida
  if (!url) {
    showNotification('Por favor, ingresa una URL válida.', 'warning');
    return;
  }

  // Consumir la API
  fetchApiData(url);
});

function displayResults(data) {
  resultsContent.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
