### TP final - diseño web

# Consumo de API con HTML, JavaScript y Bootstrap

Este proyecto es una aplicación web sencilla que permite consumir datos desde una API externa. Los datos obtenidos se procesan y se muestran dinámicamente en la interfaz utilizando **HTML**, **JavaScript (vanilla)** y estilos proporcionados por **Bootstrap**.

## Estructura del proyecto

```
/
├── index.html        # Archivo HTML principal
├── styles.css        # Hoja de estilos para personalización adicional
├── script.js         # Lógica principal en JavaScript
├── logo.png          # Logo del sitio (puedes reemplazarlo por el tuyo)
└── README.md         # Archivo explicativo del proyecto
```

---

## Características principales
1. **Formulario**: 
   - Permite ingresar una URL para consumir datos de una API.
   - Valida que el campo no esté vacío antes de procesar.
2. **Consumo de API**:
   - Utiliza `fetch` con `async/await` para obtener datos de una API.
   - Manejo de errores en caso de que la URL sea incorrecta o haya problemas de red.
3. **Visualización de datos**:
   - Si la API devuelve un **arreglo de objetos**, los datos se muestran en una tabla.
   - Si la API devuelve un **objeto**, se muestran como un listado.
4. **Notificaciones dinámicas**:
   - Mensajes visuales que informan al usuario sobre el éxito o el fallo de la solicitud.
5. **Diseño con Bootstrap**:
   - Uso de clases como `container`, `alert`, `table`, y `btn` para un diseño responsivo y atractivo.

---

## ¿Cómo funciona?

### 1. Formulario de entrada
El usuario ingresa la URL de una API en el campo de texto. Por ejemplo:
```plaintext
https://jsonplaceholder.typicode.com/posts
```
Cuando el usuario presiona el botón **Consultar**, se envía la URL a la función `fetchApiData`.

---

### 2. Consumo de la API
La función `fetchApiData` utiliza el método `fetch` para realizar una solicitud GET a la URL proporcionada.  
- Si la respuesta es exitosa (`status 200`), los datos se convierten a formato JSON y se procesan para mostrarlos en la página.
- Si ocurre algún error (por ejemplo, un 404 o la URL es inválida), se muestra un mensaje de error con una clase `alert-danger`.

Ejemplo de código:
```javascript
async function fetchApiData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    displayResults(data); // Procesa y muestra los datos
  } catch (error) {
    showNotification(`Error: ${error.message}`, 'danger');
  }
}
```

---

### 3. Visualización de resultados
Los datos obtenidos se procesan de dos maneras:
- **Tabla**: Si los datos son un arreglo de objetos, se generan encabezados basados en las claves del primer objeto y se llenan las filas con los valores.
- **Listado**: Si los datos son un objeto simple, se crea una lista con sus claves y valores.

Ejemplo de tabla generada:
```html
<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <th>Id</th>
      <th>Título</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Ejemplo</td>
    </tr>
  </tbody>
</table>
```

---

## Clases de Bootstrap usadas
### Diseño y estructura:
- **`container`**: Asegura márgenes laterales y centraliza el contenido.
- **`row` y `col`**: Organizan elementos en filas y columnas para diseño responsivo.
  
### Botones y formularios:
- **`btn` y `btn-primary`**: Botón estilizado en color azul.
- **`form-control`**: Da estilo uniforme a los campos de texto.

### Tablas:
- **`table`**: Da formato a la tabla.
- **`table-striped`**: Agrega un fondo alternado a las filas.
- **`table-bordered`**: Agrega bordes a las celdas.

### Alertas:
- **`alert` y `alert-success`**: Para notificaciones de éxito.
- **`alert-danger`**: Para notificaciones de error.

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
