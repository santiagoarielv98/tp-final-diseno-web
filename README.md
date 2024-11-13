# tp final de diseño web

El proyecto consiste en una página web que permite al usuario ingresar una URL de una API, 
visualizar los datos de la API y descargarlos en formato JSON.

El proyecto está compuesto por un archivo HTML (index.html) y un archivo JavaScript (scripts.js).

El archivo HTML contiene un formulario con un campo de texto para ingresar la URL de la API,
un botón para enviar el formulario y un contenedor para mostrar los datos de la API.

El archivo JavaScript contiene la lógica del proyecto, que se explica a continuación:

1. Se declaran las variables y constantes necesarias para interactuar con los elementos del DOM.

2. Se define un objeto alertConfig que contiene información sobre los iconos y colores de las alertas.

3. Se define una lista de APIs soportadas (apis) que se utilizan para generar una URL aleatoria.

4. Se declaran las funciones necesarias para el funcionamiento del proyecto:

    - generarUrl: genera una URL aleatoria basada en la lista de APIs soportadas.
    - generarLoader: muestra un loader mientras se cargan los datos de la API.
    - descargarArchivo: descarga un archivo JSON con los datos de la API.
    - crearAlert: crea una alerta con un mensaje y un tipo determinado.
    - renderDefault: renderiza los datos por defecto en formato JSON.
    - renderRickAndMorty: renderiza los datos de la API de Rick and Morty en una tabla.
    - renderRickAndMortyDetalle: renderiza los datos de un personaje específico de la API de Rick and Morty.

5. Se añaden los eventos necesarios para el funcionamiento del proyecto:

    - Cuando se envía el formulario, se realiza una petición a la URL ingresada por el usuario,
      se obtienen los datos de la API y se renderizan en la página.
    - Cuando se hace click en el botón de descarga, se descargan los datos en formato JSON.
    - Cuando se hace click en el botón de generar URL, se genera una URL aleatoria de la lista de APIs soportadas.

El proyecto permite al usuario interactuar con una API, visualizar los datos de la API y descargarlos en formato JSON.