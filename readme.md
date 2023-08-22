<br/>
<p align="center">
  <a href="https://github.com/Gh0stRaccoon/M8_prueba">
    <img src="https://bootcamp.e-camp.cl/pluginfile.php/1/theme_edumy/headerlogo2/1691420266/Logo%20ECAMPb_alone1.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Prueba Final Módulo 8</h3>

  <p align="center">
    API básica para la gestión de usuarios y bootcamps
    <br/>
    <br/>
  </p>
</p>


## Consigna

El equipo de desarrollo de software ha comenzado un desarrollo para el acceso a datos por medio de una aplicación realizada por medio de Node.js.

Dicho desarrollo se basó en el diseño de acceso a datos por medio de sequelize y las relaciones respectivas para la gestión de cursos Bootcamp de una determinada empresa de adiestramiento. 

El equipo aplica la metodología scrum y ya realizó el primer Sprint del proyecto que se trató en el diseño e implementación por medio de Node.js para el registro de cursos Bootcamp y de usuarios de los mismos.

Ahora bien para éste segundo Sprint, se desea adecuar dicho diseño con la finalidad que éste disponible a través de una API RESTful, para éste nuevo sprint, se agrega a la tabla users el nuevo campo password, con un mínimo de 8 caracteres de requerimiento, con la finalidad de poder autenticar al usuario, el modelo de entidad relación de la base de datos es el que muestra a continuación.

![modelo de la base de datos](https://i.imgur.com/GojhGgK.png "modelo relacional de la base de datos")

El requerimiento emitido por la empresa de adiestramiento parte del principio de que los usuarios pueden participar en distintos bootcamp, y a su vez distintos bootcamp poseen distintos usuarios como se realizó en el primer sprint.

Para el segundo Sprint se desea la construcción de la API RESTful con Express del bootcamp, soportará el token basado en la autenticación con JWT(JSONWebToken) y PostgreSQL.

Para la construcción de la API debe contener los siguientes funcionalidades:
- Un usuario de puede registrar en la API
- Un usuario inicia sesión con el email y el password
- Los registros se guardarán en la base de datos PostgreSQL
- Una vez registrado el usuario usuario puede agregar bootcamp
- Puede asignar usuarios a los bootcamp
- La consulta de los bootcamp es pública

## Contruido con

Para construir este proyecto, se implementaron diferentes herramientas/frameworks, los cuales serán enumerados a continuación:

* [Postgresql](https://www.postgresql.org/)
* [ExpressJS](https://expressjs.com/)
* [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [Sequelize](https://sequelize.org/)
* [Dotenv (development)](https://www.npmjs.com/package/dotenv)
* [Nodemon](https://www.npmjs.com/package/nodemon)

## ¡Comenzando!

Sigue estas instrucciones sencillas para montar el proyecto en tu equipo local.

### Pre-requisitos

Para poder ejecutar este repositorio en tu equipo local necesitas los siguientes prerequisitos:

* NodeJS y NPM
puedes instalarlo desde su página oficial https://nodejs.org/en
o puedes instalar NVM https://github.com/nvm-sh/nvm



### Instalación

1. Clona el repo

```sh
git clone https://github.com/Gh0stRaccoon/M8_Prueba.git
```

3. Instala los paquetes NPM

```sh
npm install
```

4. Ingresa tus variables de entorno en el archivo `.env`

```
  HOST=
  USER=
  PASSWORD=
  DB=
  DIALECT=
  SECRET=
```

## Endpoints

Tienes diferentes rutas para probar:

| Método | Endpoint | Accion |
|----------|----------|----------|
| POST    | /api/signup   | Registro de una nuevo usuario, acceso público  |
| POST    | /api/signin   | Inicio de sesion a la API, acceso público   |
| GET    | /api/user/:id   | Lista información del usuario según id, acceso por medio de token, previamente iniciado sesión   |
| GET    | /api/user   | Lista información de todos los usuarios y los bootcamp registrados, acceso por medio de token, previamente iniciado sesión  |
| PUT    | /api/user/:id   | Actualiza los campos de firstName y lastName de un usuario según su id, acceso por medio de token, previamente iniciado sesión  |
| DELETE   | /api/user/:id   | Lista información del usuario según id, acceso por medio de token, previamente iniciado sesión   |
| POST    | /api/bootcamp   | Crea un bootcamp, acceso por medio de token, previamente iniciado sesión  |
| POST    | /api/bootcamp/adduser | Agrega usuarios previamente registrados al bootcamp, acceso por medio de token, previamente iniciado sesión |
| GET    | /api/bootcamp/:id   | Obtiene información de un bootcamp según id, y muestra los usuarios registrados en el bootcamp. Acceso por medio de token, previamente iniciado sesión   |
| GET    | /api/bootcamp   | Lista todos los bootcamp, acceso público   |


## Authors
* [Joaquín Ignacio Ossandón Gómez](https://github.com/Gh0stRaccoon) - *Estudiante en Talento Digital para Chile*

## Acknowledgements

* [Gh0stRaccoon](https://github.com/Gh0stRaccoon)
