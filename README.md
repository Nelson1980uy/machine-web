# MACHINE

## Official Platform · Industrial Packaging Systems

**MACHINE** es una plataforma digital oficial orientada al entorno de maquinaria, envasado y empaquetado industrial.

El proyecto fue diseñado y desarrollado para centralizar servicios digitales relacionados con la plataforma MACHINE, incluyendo acceso de usuarios, perfiles, comunicación, soporte, atención al usuario y herramientas orientadas al entorno operativo.

---

## 🏭 Sobre MACHINE

MACHINE nace como una plataforma tecnológica enfocada en el ecosistema de máquinas y procesos de envasado y empaquetado industrial.

La plataforma busca proporcionar un entorno digital moderno para usuarios y operadores, integrando en un mismo sistema:

* Información de MACHINE.
* Acceso de usuarios.
* Registro de operadores.
* Perfiles de usuario.
* Comunicación entre usuarios.
* Chat público.
* Chat privado.
* Presencia de usuarios conectados.
* Notificaciones en tiempo real.
* Sistema de soporte.
* Atención al usuario.
* Solicitudes de asistencia.
* Comentarios públicos.
* Comunicación mediante correo electrónico.
* Persistencia de información mediante PostgreSQL.

La interfaz fue diseñada con una identidad visual industrial, tecnológica y futurista, manteniendo una experiencia orientada a usuarios reales y diferentes tamaños de pantalla.

---

## 🎯 Objetivo del proyecto

El objetivo de MACHINE es construir un ecosistema digital capaz de conectar la plataforma, sus usuarios y sus servicios en una única experiencia.

El proyecto combina una interfaz web moderna con un backend independiente, una base de datos relacional, comunicación en tiempo real y servicios de correo.

La arquitectura fue planteada para permitir que MACHINE continúe creciendo y pueda incorporar nuevas funcionalidades sin depender de una única capa del sistema.

---

## 👨‍💻 Autor

**Nelson Lapizaga**

Desarrollador y creador de MACHINE.

**Ubicación:** Uruguay

**Contacto:** [machineofficialsupport@gmail.com](mailto:machineofficialsupport@gmail.com)

El proyecto MACHINE fue concebido, diseñado y desarrollado por Nelson Lapizaga como una plataforma tecnológica independiente orientada al entorno industrial y digital.

---

# ⚙️ Funcionalidades

## 🌐 Plataforma oficial

La web oficial de MACHINE funciona como punto de entrada al ecosistema de la plataforma.

Incluye:

* Identidad visual MACHINE.
* Interfaz industrial/futurista.
* Diseño responsive.
* Adaptación para escritorio y dispositivos móviles.
* Pantallas de inicio y preparación del sistema.
* Sistema de navegación.
* Acceso a las diferentes áreas de la plataforma.

---

## 👤 Sistema de usuarios

MACHINE incorpora un sistema de usuarios que permite:

* Crear cuentas.
* Iniciar sesión.
* Gestionar sesiones.
* Identificar operadores.
* Utilizar correo electrónico.
* Utilizar identificadores de empleado.
* Crear perfiles.
* Añadir fotografía de perfil.
* Mantener información del usuario asociada a la plataforma.

La autenticación se comunica con el backend y utiliza mecanismos de sesión para mantener el acceso durante la sesión activa.

---

## 💬 Comunicación

MACHINE incorpora un sistema de comunicación entre usuarios.

Las funcionalidades desarrolladas incluyen:

* Chat público.
* Chat privado.
* Conversaciones entre operadores.
* Presencia de usuarios.
* Detección de usuarios conectados.
* Notificaciones de mensajes privados.
* Indicadores de mensajes enviados y leídos.
* Comunicación en tiempo real mediante Socket.IO.

El sistema está preparado para continuar evolucionando hacia funcionalidades multimedia y nuevas herramientas de comunicación.

---

## 🟢 Presencia en tiempo real

La plataforma utiliza Socket.IO para mantener información de presencia entre los usuarios conectados.

Esto permite conocer el estado de conexión de los usuarios y actualizar la interfaz sin necesidad de realizar recargas constantes de la página.

---

## 🔔 Notificaciones privadas

MACHINE incorpora notificaciones para mensajes privados recibidos mientras el usuario se encuentra utilizando otras áreas de la plataforma.

El sistema contempla:

* Identificación del remitente.
* Fotografía del usuario.
* Nombre del usuario.
* Indicador de conexión.
* Aviso de nuevo mensaje.
* Apertura de la conversación privada.
* Control para evitar notificaciones innecesarias cuando la conversación correspondiente ya se encuentra abierta.

---

# 🛠️ Sistema de soporte

La plataforma oficial incorpora un sistema público de atención al usuario.

Los usuarios pueden enviar solicitudes de soporte proporcionando:

* Nombre.
* Correo electrónico.
* Asunto.
* Mensaje.

El proceso de soporte funciona de la siguiente manera:

1. El usuario completa el formulario.
2. MACHINE envía la solicitud al backend.
3. El backend valida la información.
4. La solicitud se almacena en PostgreSQL.
5. Se genera una notificación mediante correo electrónico.
6. La solicitud queda registrada para su posterior gestión.

Las solicitudes se almacenan mediante la tabla:

`public.site_support_requests`

El sistema utiliza Nodemailer y Gmail SMTP para el envío de notificaciones.

---

# ✉️ Sistema de correo

MACHINE utiliza **Nodemailer** para realizar el envío de correos relacionados con el sistema de soporte.

La configuración del correo se mantiene mediante variables de entorno y no forma parte del código público.

El sistema fue probado mediante Gmail SMTP y se verificó correctamente la autenticación y aceptación de mensajes por parte del servidor de Gmail.

---

# 💭 Sistema de comentarios

La plataforma también incorpora un sistema de comentarios públicos.

Los comentarios enviados por los usuarios se almacenan en PostgreSQL y utilizan estados de moderación antes de ser mostrados públicamente.

Tabla utilizada:

`public.site_comments`

Este mecanismo permite separar el envío del comentario de su publicación pública.

---

# 🗄️ Base de datos

MACHINE utiliza **PostgreSQL** como sistema de gestión de base de datos.

Entre las áreas de información utilizadas por la plataforma se encuentran:

* Usuarios.
* Perfiles.
* Temas de conversación.
* Mensajes privados.
* Comentarios.
* Solicitudes de soporte.

Tablas principales utilizadas durante el desarrollo:

```text
public.users
public.user_profiles
public.chat_topics
public.site_comments
public.site_support_requests
```

La información privada y las credenciales de acceso a la base de datos no forman parte del repositorio público.

---

# 🧩 Arquitectura

MACHINE está dividido en frontend y backend independientes.

```text
MACHINE
│
├── machine
│   └── FRONTEND
│       ├── React
│       ├── Vite
│       ├── JavaScript
│       ├── HTML
│       └── CSS
│
└── machine-backend
    └── BACKEND
        ├── Node.js
        ├── Express
        ├── PostgreSQL
        ├── Socket.IO
        └── Nodemailer
```

El frontend se comunica con el backend mediante API HTTP.

Las funcionalidades que requieren comunicación inmediata utilizan Socket.IO.

El backend administra la lógica del sistema y la comunicación con PostgreSQL.

---

# 💻 Tecnologías utilizadas

## Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3

## Backend

* Node.js
* Express
* REST API
* Socket.IO

## Base de datos

* PostgreSQL

## Comunicación en tiempo real

* Socket.IO
* WebSockets

## Correo electrónico

* Nodemailer
* Gmail SMTP

## Desarrollo

* Visual Studio Code
* Google Chrome
* PowerShell
* npm

## Control de versiones

* Git
* GitHub

## Despliegue

* Netlify para el frontend
* Servicio independiente para el backend

---

# 🎨 Diseño de interfaz

La identidad visual de MACHINE está basada en una estética industrial y tecnológica.

La interfaz utiliza:

* Tema oscuro.
* Elementos tecnológicos.
* Contraste elevado.
* Componentes orientados a operadores.
* Indicadores de estado.
* Elementos de control.
* Diseño responsive.
* Identidad visual propia.
* Iconografía personalizada.

La imagen `operador.png` forma parte de la identidad visual utilizada por la plataforma.

El favicon oficial de MACHINE utiliza una versión circular de la identidad del operador.

---

# 📱 Diseño responsive

La plataforma está desarrollada para adaptarse a diferentes tamaños de pantalla.

Se contempla el uso desde:

* Computadoras de escritorio.
* Laptops.
* Tablets.
* Dispositivos móviles.

La interfaz se desarrolla teniendo en cuenta tanto la navegación tradicional como el concepto de interacción utilizado en sistemas industriales y paneles de control.

---

# 🔐 Seguridad

La seguridad es una parte importante de la arquitectura de MACHINE.

Las credenciales y configuraciones privadas se manejan mediante variables de entorno.

Los siguientes elementos no deben publicarse:

* Contraseñas.
* Tokens.
* Secretos de sesión.
* Contraseñas de aplicaciones.
* Credenciales de PostgreSQL.
* Claves privadas.
* Configuraciones sensibles.

Los archivos `.env` deben permanecer fuera del repositorio público.

El proyecto utiliza `.gitignore` para evitar que información sensible sea incluida accidentalmente en Git.

---

# 🔑 Variables de entorno

MACHINE utiliza variables de entorno para separar la configuración del código fuente.

El repositorio público no contiene los valores reales de estas variables.

Ejemplos de configuración utilizada por el sistema:

```text
VITE_API_URL

MACHINE_SUPPORT_EMAIL

MACHINE_SUPPORT_APP_PASSWORD

DATABASE_URL

JWT_SECRET
```

Los valores reales deben configurarse únicamente en el entorno correspondiente.

---

# 📁 Estructura del proyecto

## Frontend

```text
machine/
│
├── public/
│   ├── favicon-machine.png
│   ├── operador.png
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Backend

El backend se mantiene en un proyecto independiente:

```text
machine-backend/
```

Esto permite mantener separadas las responsabilidades del frontend y del servidor.

---

# 🚀 Instalación

## Requisitos

Para trabajar con MACHINE se requiere:

* Node.js
* npm
* PostgreSQL
* Git
* Visual Studio Code
* Google Chrome

---

## Frontend

Desde:

```text
C:\Users\Nelson\Proyectos\machine
```

instalar dependencias:

```bash
npm install
```

Iniciar el entorno de desarrollo:

```bash
npm run dev
```

---

## Backend

Desde:

```text
C:\Users\Nelson\Proyectos\machine-backend
```

instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La configuración del backend requiere sus correspondientes variables de entorno.

---

# 🔄 Comunicación frontend / backend

El frontend se comunica con el backend mediante una API HTTP.

La dirección de la API puede configurarse mediante:

```text
VITE_API_URL
```

Cuando se encuentra configurada, el frontend utiliza dicha dirección para realizar las solicitudes al servidor.

Las conexiones de Socket.IO utilizan el backend para proporcionar comunicación en tiempo real.

---

# 📡 Comunicación en tiempo real

Socket.IO permite que MACHINE pueda actualizar determinados estados sin recargar la página.

Entre las funcionalidades desarrolladas se encuentran:

* Registro del usuario conectado.
* Presencia.
* Usuarios online.
* Mensajes privados.
* Eventos de comunicación.
* Notificaciones.
* Actualización de estados.

---

# 🌍 SEO y presencia web

La página oficial de MACHINE está siendo preparada para su publicación y posterior indexación en motores de búsqueda.

La configuración contempla:

* Título oficial.
* Meta description.
* Favicon.
* Canonical URL.
* Robots.
* Sitemap.
* Open Graph.
* Twitter/X metadata.
* Identidad visual.
* Preparación para Google Search Console.

El objetivo es proporcionar a los motores de búsqueda información clara sobre la naturaleza de MACHINE y sus contenidos públicos.

---

# 🤖 Robots y Sitemap

El proyecto incorpora archivos destinados a facilitar el rastreo del sitio:

```text
public/robots.txt
public/sitemap.xml
```

La configuración definitiva de estos archivos se realizará utilizando el dominio oficial de MACHINE después del despliegue.

---

# ☁️ Publicación

El código fuente de MACHINE se mantendrá mediante Git y GitHub.

El frontend será publicado mediante Netlify.

El flujo de despliegue previsto es:

```text
Desarrollo local
       ↓
Git
       ↓
GitHub
       ↓
Netlify
       ↓
MACHINE Web Oficial
```

Una vez publicado el dominio oficial, se configurarán los elementos SEO definitivos y Google Search Console.

---

# 🧪 Desarrollo y pruebas

Durante el desarrollo se realizan pruebas de:

* Registro.
* Inicio de sesión.
* Sesiones.
* Comunicación frontend/backend.
* PostgreSQL.
* Chat.
* Socket.IO.
* Presencia.
* Mensajes privados.
* Soporte.
* Envío de correos.
* Diseño responsive.
* Navegación.
* Persistencia de información.

El sistema de correo fue probado mediante Nodemailer y Gmail SMTP antes de continuar con la integración del formulario público de soporte.

---

# 🗺️ Roadmap

## Completado

* [x] Plataforma web MACHINE.
* [x] Identidad visual MACHINE.
* [x] Interfaz industrial/futurista.
* [x] Diseño responsive.
* [x] Sistema de registro.
* [x] Sistema de inicio de sesión.
* [x] Gestión de sesión.
* [x] Perfiles de usuario.
* [x] Fotografía de perfil.
* [x] Chat público.
* [x] Chat privado.
* [x] Presencia de usuarios.
* [x] Socket.IO.
* [x] Notificaciones privadas.
* [x] Sistema de comentarios.
* [x] Sistema público de soporte.
* [x] Persistencia de solicitudes de soporte.
* [x] PostgreSQL.
* [x] Nodemailer.
* [x] Integración con Gmail SMTP.
* [x] Favicon oficial.
* [x] Preparación SEO inicial.

## En desarrollo

* [ ] Persistencia completa del estado de navegación.
* [ ] Restauración de conversaciones privadas después de una recarga.
* [ ] Multimedia en conversaciones privadas.
* [ ] Envío de imágenes.
* [ ] Envío de vídeos.
* [ ] Envío de archivos.
* [ ] Envío de audio.
* [ ] Mejoras adicionales de soporte.
* [ ] Publicación oficial en Netlify.
* [ ] Configuración definitiva de dominio.
* [ ] Google Search Console.
* [ ] Indexación del sitio oficial.

---

# 🏗️ Filosofía del proyecto

MACHINE está siendo desarrollado con la intención de construir una plataforma real y escalable, evitando que la aplicación dependa únicamente de estados locales del navegador.

La arquitectura separa:

* Interfaz.
* Lógica de servidor.
* Persistencia.
* Comunicación en tiempo real.
* Servicios externos.

Esta separación permite que el proyecto pueda continuar creciendo con nuevas funcionalidades.

---

# 📌 Estado actual

MACHINE se encuentra en desarrollo activo.

La plataforma cuenta con una base funcional de usuarios, comunicación, soporte, persistencia y servicios de correo, mientras continúan desarrollándose nuevas funcionalidades y mejoras de infraestructura.

La publicación oficial y la configuración de presencia en buscadores forman parte de la siguiente etapa del proyecto.

---

# 📬 Contacto

Para consultas relacionadas con MACHINE:

**Correo oficial:**
[machineofficialsupport@gmail.com](mailto:machineofficialsupport@gmail.com)

Las solicitudes de soporte pueden realizarse mediante el sistema oficial de atención al usuario disponible en la plataforma MACHINE.

---

# 📄 Licencia

Este proyecto es propiedad de su creador.

La publicación del código fuente en GitHub no implica autorización para copiar, redistribuir, modificar o utilizar comercialmente el proyecto sin autorización del propietario.

---

# MACHINE

**Official Platform · Industrial Packaging Systems**

Diseñado y desarrollado por **Nelson Lapizaga**

**Uruguay**

© 2026 MACHINE. All rights reserved.

