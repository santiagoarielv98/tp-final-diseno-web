# TP final - diseño web

Este proyecto es una aplicación web sencilla que permite consumir datos desde una API externa. Los datos obtenidos se procesan y se muestran dinámicamente en la interfaz utilizando **HTML**, **JavaScript** y estilos proporcionados por **Bootstrap**.

---

## Características principales
1. **Formulario**: 
   - Permite ingresar una URL para consumir datos de una API.
   - Valida que el campo no esté vacío antes de procesar.
2. **Consumo de API**:
   - Utiliza `fetch` con `async/await` para obtener datos de una API.
   - Manejo de errores en caso de que la URL sea incorrecta o haya problemas de red.
3. **Visualización de datos**:
    - Muestra los datos obtenidos en formato JSON de manera legible para el usuario.
4. **Notificaciones dinámicas**:
   - Mensajes visuales que informan al usuario sobre el éxito o el fallo de la solicitud.
5. **Diseño con Bootstrap**:
   - Uso de clases como `

---

## ¿Cómo funciona?

### 1. Formulario de entrada
El usuario ingresa la URL de una API en el campo de texto. Por ejemplo:
```plaintext
https://jsonplaceholder.typicode.com/posts
```
Cuando el usuario presiona el botón **Consultar**, se envía la URL a la función `obtenerDatosAPI`.

---

### 2. Consumo de la API
La función `obtenerDatosAPI` es asincrónica (`async`) y utiliza el método `fetch` para realizar una solicitud GET a la URL proporcionada.  
- Si la respuesta es exitosa (`status 200`), los datos se convierten a formato JSON y se procesan para mostrarlos en la página.
- Si ocurre algún error (por ejemplo, un 404 o la URL es inválida), se muestra un mensaje de error con una clase `alert-danger`.
- Si la solicitud es exitosa, se muestra un mensaje de éxito con una clase `alert-success`.
- Si el campo de texto está vacío, se muestra un mensaje de advertencia con una clase `alert-info`.

Ejemplo de código:
```javascript
async function obtenerDatosAPI(url) {
  try {
    const response = await fetch(url); // Realizar la solicitud a la URL

    if (!response.ok) { // Si la respuesta no es exitosa
      throw new Error('No se pudieron obtener los datos.'); // Lanzar un error que luego es capturado en el bloque catch
    }

    const data = await response.json(); // Si la respuesta es exitosa, convertir los datos a formato JSON
    mostrarNotificacion('Datos cargados correctamente.', 'success'); // Mensaje de éxito
    mostrarResultado(data); // Mostrar los datos en la página
  } catch (error) {
    mostrarNotificacion(`Error al cargar los datos: ${error.message}`, 'danger'); // Mensaje de error

    resultadoEl.innerHTML = '<p class="text-danger mb-0">No se pudieron obtener los datos.</p>'; // Limpiar el resultado y mostrar un mensaje de error
  }
}
```

---

### 3. Visualización de resultados
Los datos obtenidos de la API se procesan y se muestran en la página.
Utilizando el elemento `<pre>` de HTML, se muestran los datos en formato JSON de manera legible para el usuario.


Ejemplo del resultado:
```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum"
  }
]
```

---

## Clases de Bootstrap usadas
### Barra de navegación
- `.navbar`: Barra de navegación, esta clase agrega estilos a la etiqueta `nav` (como padding y margen, etc).
- `.navbar-brand`: Clase que estiliza el logo de la barra de navegación (le agrega un padding).

### Formulario
- `.form-control`: Clase que estiliza los inputs (le agrega un padding, margen, borde y ancho).
- `.btn`: Clase que estiliza los botones (le agrega un padding, margen, color de fondo y texto).
- `.btn-primary`: Clase que estiliza los botones de color primario (le agrega un color de fondo y texto blanco).

### Alertas
- `.alert`: Clase que estiliza las alertas (le agrega un padding, margen, borde y color de fondo).
- `.alert-danger`: Clase que estiliza las alertas de color rojo (le agrega un color de fondo y texto blanco) [utilizados en main.js para mostrar errores].
- `.alert-success`: Clase que estiliza las alertas de color verde (le agrega un color de fondo y texto blanco) [utilizados en main.js para mostrar éxito].
- `.alert-info`: Clase que estiliza las alertas de color azul (le agrega un color de fondo y texto blanco) [utilizados en main.js para mostrar información].

### Otros
- `.text-center`: Clase que centra el texto.
- `.rounded`: Clase que redondea las esquinas de un elemento.
- `.border`: Clase que agrega un borde alrededor de un elemento.
- `.d-none`: Clase que oculta un elemento (no lo elimina del DOM, solo lo oculta).
- `.text-white`: Clase que cambia el color del texto a blanco.
- `.bg-body-tertiary`: Clase que cambia el color de fondo del cuerpo a un color terciario.
- `.py-3`: Padding en el eje Y de 3.
- `.p-3`: Padding de 3 en todas las direcciones.
- `.mt-auto`: Margen en el eje Y automático (en este caso se usa para que el footer se pegue al final de la página).
- `.min-vh-100`: Altura mínima del viewport del 100% (esto hará que el contenido ocupe al menos toda la pantalla).
- `.container`: Clase que centra el contenido y le da un ancho máximo de 1140px (en pantallas grandes) y 100% de ancho en pantallas pequeñas.
- `.d-flex`: Flexbox (el comportamiento de los elementos hijos será en fila).
- `.flex-column`: Flexbox (el comportamiento de los elementos hijos será en columna).
<!-- agregar la nota -->
#### Nota
- Las clases `.d-flex`, `.flex-column` y `.min-vh-100` en el cuerpo (`body`) y `.mt-auto` en el footer son necesarias para que el footer se pegue al final de la página.

---

## Cómo ejecutar el proyecto
1. Descarga o clona este repositorio.
2. Coloca el archivo `index.html` en cualquier navegador web.
3. Ingresa una URL de una API que devuelva un JSON y presiona el botón **Consultar**.
4. Observa los resultados dinámicos en la sección de resultados.

---

## Notas importantes
- Asegúrate de ingresar una URL válida que devuelva datos en formato JSON.
- Este proyecto no incluye un servidor backend; todo el procesamiento ocurre en el navegador.
- Puedes reemplazar el archivo `logo.png` por un logotipo propio.
