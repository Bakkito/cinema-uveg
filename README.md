# Cinema UVEG

## Descripción del proyecto

Cinema UVEG es una aplicación web desarrollada con Angular que permite consultar y visualizar información de películas mediante la API de The Movie Database (TMDB). Su propósito es presentar un catálogo de películas a través de una interfaz web.

## Tecnologías utilizadas

- Angular.
- TypeScript.
- HTML y CSS.
- API de The Movie Database (TMDB).
- Node.js y npm.
- Git y GitHub.
- Apache para el despliegue local.

## Requisitos previos

Para trabajar con el código fuente se requiere tener instalado:

- Node.js y npm.
- Angular CLI compatible con la versión del proyecto.
- Git.
- Visual Studio Code u otro editor de código.

## Instalación del proyecto

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Bakkito/cinema-uveg.git
   ```

2. Acceder al directorio:

   ```bash
   cd cinema-uveg
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Ejecutar la aplicación en modo de desarrollo:

   ```bash
   npm start
   ```

   Si el proyecto no cuenta con un script `start`, utilizar:

   ```bash
   npx ng serve
   ```

5. Abrir en el navegador la dirección local indicada por Angular CLI, normalmente `http://localhost:4200`.

## Compilación para producción

Para generar los archivos optimizados de la aplicación, ejecutar:

```bash
npm run build
```

Angular genera los archivos de producción en el directorio `dist/cinema-uveg`, de acuerdo con la configuración actual del proyecto.

## Empaquetado

Los archivos generados para producción se empaquetaron en el archivo:

`entregables/cinema-uveg-produccion.zip`

El paquete contiene el archivo principal `index.html`, los recursos JavaScript y CSS, y el favicon. Estos archivos constituyen la versión preparada para su publicación en un servidor web.

## Versionamiento con Git

El proyecto utiliza Git para registrar los cambios realizados durante el desarrollo.

Se creó la rama principal `main` y se registró el siguiente commit inicial:

`feat: preparar Cinema UVEG para despliegue`

El repositorio remoto se encuentra alojado en GitHub:

https://github.com/Bakkito/cinema-uveg

Para enviar cambios posteriores al repositorio remoto se pueden utilizar los siguientes comandos:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

## Despliegue

La aplicación se prepara para desplegarse localmente mediante el servidor web Apache. El procedimiento contempla copiar los archivos compilados al directorio público del servidor y verificar el acceso desde el navegador.

La dirección local y los resultados de las pruebas se documentarán una vez finalizada la configuración de Apache.

## Autoría y propósito académico

Este proyecto forma parte de una actividad académica de la Universidad Virtual del Estado de Guanajuato (UVEG), cuyo objetivo es practicar el empaquetado, el versionamiento y el despliegue de aplicaciones web.