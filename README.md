
<img width="1920" height="1080" alt="bf" src="https://github.com/user-attachments/assets/f38b758d-af15-41c0-b84d-79cdc8a60fa8" />

# FleetTracker — Reto Técnico Frontend

Aplicación frontend para gestión básica de flota (listado, alta, detalle, edición y eliminación de vehículos) consumiendo una API REST simulada con `json-server`.

## Índice

- [Stack](#stack)
- [Requisitos](#requisitos)
- [Cómo correr el proyecto](#cómo-correr-el-proyecto)
	- [Variables de entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Rutas y redirecciones (y por qué están así)](#rutas-y-redirecciones-y-por-qué-están-así)
- [Decisiones técnicas](#decisiones-técnicas)
	- [Por qué Tailwind (y cómo está aplicado)](#por-qué-tailwind-y-cómo-está-aplicado)
	- [Por qué Zustand](#por-qué-zustand)
	- [Por qué React Query](#por-qué-react-query)
	- [Por qué esta API y por qué así el consumo](#por-qué-esta-api-y-por-qué-así-el-consumo)
	- [Manejo de errores (por qué está separado)](#manejo-de-errores-por-qué-está-separado)
	- [Formularios: React Hook Form + Zod](#formularios-react-hook-form--zod)
- [Arquitectura (y justificación)](#arquitectura-y-justificación)
- [Notas técnicas](#notas-técnicas)
- [Alcance actual](#alcance-actual)

## Stack

- **Vite + React + TypeScript**: arranque rápido, DX y tipado fuerte.
- **React Router DOM**: enrutado SPA.
- **Tailwind CSS v4**: estilos utilitarios, dark mode y tokens en CSS.
- **Zustand**: estado **UI** (sidebar/tema/usuario) con persistencia.
- **TanStack React Query**: estado **server** (fetch, cache, invalidación).
- **React Hook Form + Zod**: formularios con validación/transformación declarativa.
- **json-server**: API mock local con paginación y filtros.
- **Sonner**: toasts de feedback.

## Requisitos

- Node.js (recomendado **18+**)
- npm

## Cómo correr el proyecto

1) Instalar dependencias

```bash
npm install
```

2) Levantar la API mock (json-server)

```bash
npm run server
```

- Por defecto corre en `http://localhost:3001` y sirve el recurso `vehicles` desde `db.json`.

3) Levantar el frontend

```bash
npm run dev
```

4) Abrir en el navegador

- Vite mostrará la URL (típicamente `http://localhost:5173`).

### Variables de entorno

El frontend toma la URL base desde `VITE_API_URL`.

- Si no defines nada, se usa `http://localhost:3001` (ver `src/shared/config/environments.ts`).

Ejemplo `.env`:

```bash
VITE_API_URL=http://localhost:3001
```

## Scripts

- `npm run dev`: levanta Vite en modo desarrollo.
- `npm run build`: compila TypeScript y genera build de producción.
- `npm run preview`: previsualiza el build.
- `npm run lint`: ejecuta ESLint.
- `npm run server`: levanta `json-server` con `db.json` en el puerto 3001.

## Rutas y redirecciones (y por qué están así)

El router está definido en `src/App.tsx`.

- `/` **redirige** a `/vehicles`.
	- **Motivo**: el foco del reto es la gestión de vehículos; la lista funciona como “pantalla principal”/dashboard operativo.
	- **Efecto colateral buscado**: los botones “Volver al inicio” (por ejemplo en 404 / Coming Soon) llevan a una ruta estable que siempre tiene contenido relevante (lista de vehículos).

- `/home` existe como landing/menú (tarjetas) para navegar a módulos.

- Rutas REST para vehículos:
	- `/vehicles`: listado + búsqueda + filtro + paginación.
	- `/vehicles/new`: creación.
	- `/vehicles/:id`: detalle (con edición y eliminación desde modales).
	- **Motivo**: nombres semánticos, previsibles y escalables; siguen un patrón por recurso.

- `/drivers`, `/tracking`, `/monitoring`: apuntan a una pantalla **Coming Soon**.
	- **Motivo**: el sidebar presenta el “producto completo”, pero el alcance implementado se centra en vehículos.

- `*` (cualquier otra): 404.
	- Nota: el menú incluye `Usuarios` con path `/users` en `src/shared/utils/data-ui.ts`, pero actualmente no hay una ruta registrada para esa sección; por eso cae en 404.

## Decisiones técnicas

### Por qué Tailwind (y cómo está aplicado)

- **Velocidad y consistencia**: permite construir UI sin CSS por componente y sin pelear con especificidad.
- **Design tokens**: en `src/index.css` se definen tokens con `@theme` (por ejemplo `--color-primary`/`--color-secondary`) y utilidades puntuales (`@utility`), evitando hardcodear estilos dispersos.
- **Dark mode**: se usa una clase en `html` (`light`/`dark`) y Tailwind responde con la variante `dark`.

### Por qué Zustand

- La app necesita un estado global **pequeño** y transversal (sidebar/tema/usuario).
- Zustand aporta una API mínima sin boilerplate.
- Se usa `persist` para mantener preferencias (por ejemplo, el tema) en recargas usando la key `ui-store`.

En este proyecto, **Zustand se usa para UI state**; el estado remoto (vehículos) lo maneja React Query.

### Por qué React Query

- El listado/detalle de vehículos es **server state**: puede estar desactualizado, requiere cache, re-fetch y sincronización tras mutaciones.
- React Query simplifica:
	- cache por `queryKey`
	- deduplicación de requests
	- invalidación tras `create/update/delete`
	- estados `isLoading/isError`

Configuración relevante:

- `retry: false` en el `QueryClient` para evitar reintentos automáticos contra una API mock (y para que el usuario reciba feedback inmediato cuando algo falla).

### Por qué esta API y por qué así el consumo

- Se usa `json-server` porque permite **simular un CRUD REST** rápido, con:
	- `GET /vehicles` con paginación vía `_page`/`_limit`
	- búsqueda simple con `q`
	- filtros por campos (por ejemplo `status`)
	- header `X-Total-Count` para calcular páginas

En `src/modules/vehicles/vehicle-services.ts`:

- `getVehiclesService()` lee `X-Total-Count` y calcula `totalPages`.
- `createVehicleService()` genera `id` (UUID) y timestamps (`createdAt`, `lastUpdatedAt`) antes de enviar.

### Manejo de errores (por qué está separado)

El manejo de errores está dividido en dos capas:

1) **Transporte (genérico)** — `src/shared/services/api-service.ts`
	 - Centraliza `fetch`, construcción de URL y serialización JSON.
	 - Si `response.ok` es falso, lee el body de error y lanza un `Error` con un mensaje “humano” basado en el status (ver `src/shared/utils/get-error-messages.ts`).
	 - Si hay error de red (`TypeError`), muestra un toast específico.

2) **UX por caso de uso** — hooks de React Query
	 - En mutaciones (crear/editar/eliminar) se muestra un toast de éxito/error.
	 - En pantallas se renderiza un estado de error consistente (`ErrorState`) cuando `isError`.

Motivo: mantener un **núcleo** de red consistente y reutilizable, y dejar el detalle de UX (mensajes, navegación post-acción) en el nivel de feature.

### Formularios: React Hook Form + Zod

- `react-hook-form` reduce renders y facilita formularios grandes.
- `zod` permite:
	- mensajes de error por campo
	- coerción de tipos (números/fechas)
	- reglas de negocio (ej.: “próximo mantenimiento no puede ser pasado”)
	- transformaciones (fechas a ISO normalizadas)

## Arquitectura (y justificación)

La estructura busca separar por **capas** y por **dominios**:

```txt
src/
	app/
		layout/          # Layout shell (sidebar + outlet)
		pages/           # Páginas/rutas (Vehicles, Details, New, Home, etc.)
	modules/
		vehicles/        # Feature/dominio “vehículos”
			components/    # Componentes específicos del módulo
			vehicle-hooks.ts
			vehicle-services.ts
			vehicle-schemas.ts
			vehicle-types.ts
	shared/
		components/      # UI reusable (buttons, inputs, modal, states, etc.)
		config/          # Constantes, endpoints y envs
		hooks/           # Hooks cross-cutting (tema)
		services/        # Servicios base (API_SERVICE)
		stores/          # Estado global UI (Zustand)
		utils/           # Helpers (fechas, colores, mensajes de error, data UI)
		types/           # Tipos compartidos (request options, etc.)
```

Principios aplicados:

- **Feature-first en `modules/`**: lo que cambia por dominio (vehículos) vive junto (types/schemas/services/hooks/components). Reduce acoplamientos y hace más simple escalar a `drivers`, `tracking`, etc.
- **`shared/` como caja de herramientas**: sólo lo reutilizable/transversal.
- **Servicios por nivel**:
	- `shared/services/api-service.ts` es el cliente HTTP genérico.
	- `modules/vehicles/vehicle-services.ts` expresa casos del dominio (get/list/create/update/delete) usando el cliente genérico.
- **Hooks como API de consumo**: `vehicle-hooks.ts` expone `useGetVehicles`, `useCreateVehicle`, etc. para que las páginas no conozcan detalles de cache/invalidate.

## Notas técnicas

- Alias `@` apunta a `/src` (ver `vite.config.ts`) para imports más limpios.
- UI “skeleton” en listado (`VehiclesTableSkeleton`) para carga percibida más suave.
- Paginación usa `manualPagination` en TanStack Table y el total viene del header `X-Total-Count`.
- El tema (system/light/dark) se aplica en `useTheme()` añadiendo clase a `document.documentElement`.

## Alcance actual

- Implementado: módulo de **Vehículos** (listado, búsqueda, filtro por estado, paginación, alta, detalle, edición y eliminación).
- Placeholder: secciones de Conductores / Tracking / Monitoring (Coming Soon).

