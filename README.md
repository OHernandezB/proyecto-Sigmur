# SIGMUR

Sistema Integral de Gestión Municipal de Reportes urbanos.

SIGMUR centraliza la creación, seguimiento y resolución de incidencias municipales con enfoque georreferenciado, trazabilidad por estado y control de acceso por roles.

## Tabla de contenidos

- [Resumen del proyecto](#resumen-del-proyecto)
- [Objetivos](#objetivos)
- [Arquitectura](#arquitectura)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Requisitos previos](#requisitos-previos)
- [Configuración de entorno](#configuración-de-entorno)
- [Ejecución local](#ejecución-local)
- [API y documentación](#api-y-documentación)
- [Flujo funcional principal](#flujo-funcional-principal)
- [Estado actual](#estado-actual)
- [Roadmap sugerido](#roadmap-sugerido)
- [Buenas prácticas y seguridad](#buenas-prácticas-y-seguridad)
- [Equipo](#equipo)
- [Licencia](#licencia)

## Resumen del proyecto

SIGMUR nace para resolver la falta de una plataforma única para reportes ciudadanos. El sistema conecta:

- **Ciudadano**: crea reportes con ubicación y evidencia.
- **Operario**: gestiona tareas asignadas y actualiza el avance.
- **Administrador**: supervisa, prioriza, asigna y controla la operación.

El objetivo es reducir tiempos de respuesta, mejorar trazabilidad y optimizar recursos municipales.

## Objetivos

- Centralizar reportes e historial de gestión.
- Georreferenciar incidencias para análisis territorial.
- Aplicar flujo de estados controlado: `Pendiente`, `En Proceso`, `Resuelto`, `No Verídico`.
- Implementar autenticación y autorización por roles con JWT.
- Exponer API REST para integración con frontend React.

## Arquitectura

Proyecto con enfoque modular/microservicios en Spring Boot:

- `Auth`: autenticación, usuarios, roles, JWT.
- `Workflow`: ciclo de vida de reportes, asignaciones, notificaciones.
- `Reporting`: consulta de reportes, filtros y analítica.
- `ApiGateway`: enrutamiento y punto de entrada único.
- `FrontEnd`: interfaz web responsiva (React + Vite + Tailwind).

## Tecnologías utilizadas

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Leaflet / React-Leaflet

### Backend

- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Spring Cloud (Eureka, Gateway, OpenFeign)
- JWT (JJWT)
- PostgreSQL
- PostGIS (según modelo funcional del proyecto)
- Swagger/OpenAPI (springdoc)

## Estructura del repositorio

```text
proyecto-Sigmur/
├── BackEnd/
│   ├── Auth/
│   ├── Workflow/
│   ├── Reporting/
│   └── ApiGateway/
├── FrontEnd/
└── README.md
```

## Requisitos previos

- **Node.js** 18+ y npm
- **Java JDK** 17
- **Maven** 3.9+ (o usar `mvnw` de cada módulo)
- **PostgreSQL** 14+ (ideal con PostGIS)
- Git

## Configuración de entorno

### 1) Base de datos

Crear base de datos:

```sql
CREATE DATABASE sigmur;
```

> Si usarás geodatos avanzados, habilita PostGIS en la base correspondiente.

### 2) Backend (`BackEnd/Auth` como referencia)

Editar `BackEnd/Auth/src/main/resources/application.properties`:

- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`
- `jwt.secret`
- `jwt.expiration`

Ejemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sigmur
spring.datasource.username=postgres
spring.datasource.password=TU_PASSWORD
jwt.secret=TU_SECRETO_JWT_LARGO_Y_SEGURO
jwt.expiration=86400000
```

## Ejecución local

### Frontend

```bash
cd FrontEnd
npm install
npm run dev
```

Por defecto queda disponible en:

- `http://localhost:5173`

### Backend (por módulo)

```bash
cd BackEnd/Auth
./mvnw spring-boot:run
```

Repetir para:

- `BackEnd/Workflow`
- `BackEnd/Reporting`
- `BackEnd/ApiGateway`

> En Windows PowerShell, si falla `./mvnw`, usa `.\mvnw`.

## API y documentación

Swagger UI (ejemplo para `Auth` en puerto `8081`):

- `http://localhost:8081/swagger-ui.html`
- `http://localhost:8081/swagger-ui/index.html`

OpenAPI JSON:

- `http://localhost:8081/v3/api-docs`

## Flujo funcional principal

1. Usuario se registra/inicia sesión.
2. Se emite JWT con rol y datos de identidad.
3. Ciudadano crea reporte (categoría, descripción, coordenadas, evidencia).
4. Administrador revisa y asigna a operario.
5. Operario actualiza estado y sube evidencia de resolución.
6. Sistema conserva historial y trazabilidad de cada cambio.

## Estado actual

El repositorio contiene:

- Frontend con módulos por rol y mejoras de interfaz responsiva.
- Estructura backend por servicios (`Auth`, `Workflow`, `Reporting`, `ApiGateway`).
- Base inicial de autenticación en `Auth` (entidades, DTOs, seguridad JWT y endpoints auth).

## Roadmap sugerido

- [ ] Completar endpoints de negocio en `Workflow` y `Reporting`.
- [ ] Integrar almacenamiento de evidencias (local/S3/Cloudinary).
- [ ] Incorporar migraciones versionadas con Flyway/Liquibase.
- [ ] Añadir pruebas de integración y contract testing.
- [ ] Dockerizar servicios y orquestar con Docker Compose.
- [ ] Configurar CI/CD.

## Buenas prácticas y seguridad

- No subir secretos reales al repositorio.
- Usar variables de entorno para credenciales y JWT.
- Hashear contraseñas con BCrypt.
- Validar rol/permisos en cada endpoint protegido.
- Mantener `ddl-auto=validate` en entornos de mayor estabilidad.

## Equipo

- Pamela Albanese
- Johan Gonzalez
- Omar Hernández
- Tomás Velazquez


## Licencia

Definir licencia del proyecto (por ejemplo, MIT) antes de publicación final.
