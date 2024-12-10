# Guía de uso 👷

El proyecto funciona sobre Node JS. No es necesario correr el servidor, únicamente se ejecuta el archivo superscraping.js en la terminal usando node. En terminos generales, la app hace uso de Puppeter como librería para realizar tareas de web scraping para capturar datos que posteriormente serán cruzados con la base de datos del cliente. 

La función recibe un arreglo con números de documentos que será iterado para que capture los datos de cada documento en cada una de las iteraciones.

## Consideraciones

1. Si está descargando este proyecto desde GitHub, debe instalar las dependencias usando el comando `npm install` o `npm i`.

2. Configurar la función `browser` con el path de apertura del navegador de manera correcta. Tenga en cuenta que depende del sistema operativo y del lugar de preferencia en donde se guarda cada ejecutable en su sistema. El siguiente ejemplo corresponde a la ruta ejecutable en Ubuntu:

```javascript
const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath: '/bin/google-chrome',
});
```
3. Verificar el archivo array.js para garantizar que contenga los datos a buscar.

4. Importar de manera correcta el arreglo que se busca iterar.
```javascript
import { cc1_500 } from './array.js';
```
5. Vincular el array importado a la constand `const cc` que será identificada dentro del ciclo de iteración.
```javascript
const cc = cc1_500
```

6. Modificar el nombre del archivo JSON que será exportado con todos los resultados al finalizar la extracción de información.
```javascript
fs.writeFileSync("1-500.json", JSON.stringify(fullData, null, 2));
```