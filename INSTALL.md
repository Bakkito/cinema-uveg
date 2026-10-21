# Cinema UVEG — Guía de instalación

## 1. Descripción del proyecto

Cinema UVEG es una aplicación web desarrollada con Angular que permite consultar películas mejor valoradas mediante la API de The Movie Database (TMDB). También incorpora un backend con Node.js y Express, conectado a MariaDB, para registrar y eliminar películas favoritas.

## 2. Tecnologías utilizadas y versiones

Las siguientes versiones se verificaron en el entorno local de desarrollo:

| Tecnología | Versión |
|---|---|
| Node.js | 24.22.0 |
| npm (comando global) | 11.19.1 |
| Angular | 22.0.8 |
| Angular CLI | 22.0.9 |
| TypeScript | 6.0.3 |
| RxJS | 7.8.2 |
| Express | 5.3.0 |
| MariaDB | 10.4.32 |
| Conector MariaDB para Node.js | 3.5.4 |
| CORS | 2.8.6 |
| dotenv | 18.0.8 |
| nodemon | 3.1.14 |

**Nota:** Angular CLI informó npm 12.0.1 en su salida de versiones, mientras que el comando global `npm --version` devolvió 11.19.1. Se debe comprobar esta diferencia y registrar la versión efectiva utilizada en cada entorno.


## 3. Requisitos previos

Instalar y configurar:

1. Node.js y npm.
2. Angular CLI compatible con la versión de Angular del proyecto.
3. XAMPP con Apache y MariaDB.
4. Git, si se requiere control de versiones.
5. Un navegador web actualizado.
6. Una credencial válida de acceso a la API de TMDB.

## 4. Instalación del frontend

Abrir una terminal en la carpeta raíz del proyecto y ejecutar:

```powershell
npm install
```

Para iniciar el servidor de desarrollo:

```powershell
npx ng serve
```

Abrir la dirección:

`http://localhost:4200`

Para compilar la aplicación:

```powershell
npx ng build
```

Para generar una compilación destinada al subdirectorio de Apache:

```powershell
npm run build -- --base-href /cinema-uveg/
```

La compilación generada debe copiarse al directorio `C:\xampp\htdocs\cinema-uveg`, respetando la estructura de archivos producida por Angular.

## 5. Instalación y configuración de la base de datos

Iniciar MariaDB desde XAMPP.

El proyecto utiliza la base de datos `cinema_uveg` y la tabla `favoritas`.

El script de inicialización se encuentra en:

`backend/database/init.sql`

Para ejecutarlo desde PowerShell:

```powershell
& "C:\xampp\mysql\bin\mysql.exe" --protocol=TCP -h 127.0.0.1 -P 3307 -u root -p < .\backend\database\init.sql
```

Si PowerShell no admite la redirección `<` en ese comando, puede importarse el archivo desde el cliente MariaDB o ejecutarse mediante una terminal compatible.

Verificar la existencia de la tabla con:

```sql
USE cinema_uveg;
SHOW TABLES;
SELECT * FROM favoritas;
```

El puerto de MariaDB debe coincidir con la configuración real del servicio.

## 6. Instalación del backend

Entrar a la carpeta del backend:

```powershell
cd backend
npm install
```

Crear o revisar el archivo `.env` con los siguientes parámetros:

```dotenv
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=root
DB_PASSWORD=
DB_NAME=cinema_uveg
```

**Importante:** configurar `DB_PASSWORD` con la contraseña real de MariaDB. No publicar contraseñas, tokens ni otros secretos en repositorios o documentos.

Iniciar el backend en modo desarrollo:

```powershell
npm run dev
```

Para iniciar en modo normal:

```powershell
npm start
```

## 7. API REST

Las rutas implementadas son:

- `GET /api/health`: comprueba la conexión con MariaDB.
- `GET /api/favoritas`: consulta las películas favoritas.
- `POST /api/favoritas`: registra una película como favorita.
- `DELETE /api/favoritas/:tmdb_id`: elimina una película de favoritos.

El backend utiliza consultas parametrizadas para las operaciones de escritura y validación de los datos recibidos.

## 8. Pruebas de funcionamiento

1. Abrir la aplicación en el navegador.
2. Verificar que aparezcan las películas.
3. Seleccionar una película y agregarla a favoritos.
4. Consultar la tabla `favoritas` en MariaDB.
5. Quitar la película de favoritos.
6. Comprobar que el registro ya no aparezca.
7. Consultar `http://localhost:3000/api/health` y verificar que la respuesta indique una conexión satisfactoria.

Registrar las evidencias mediante capturas de pantalla.

## 9. Seguridad y mantenimiento

- Mantener las credenciales fuera del código fuente público.
- Utilizar validación de entradas y consultas SQL parametrizadas.
- Limitar los orígenes permitidos mediante CORS.
- Revisar las dependencias y sus vulnerabilidades.
- Configurar HTTPS y cabeceras de seguridad para el despliegue.
- Incorporar aviso de privacidad y términos y condiciones.
- Probar el sistema en distintos navegadores.

Las medidas de seguridad, el dominio local y HTTPS deben verificarse por separado antes de considerarse terminados.

## 10. Consideraciones finales

La aplicación requiere que MariaDB y el backend estén activos para administrar favoritos. La consulta de películas también depende de la disponibilidad de la API de TMDB y de una configuración válida de acceso.
