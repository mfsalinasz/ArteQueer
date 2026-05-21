# QUEER ART

Plataforma web estatica con tres rutas principales:

- `/capitulos`
- `/cronicas`
- `/gallery`

La aplicacion usa una navegacion SPA con fallback de Nginx, por lo que las rutas funcionan al refrescar cuando se despliega con Docker/Railway.

## Imagenes

Cada bloque visual muestra el texto `Ruta de imagen: ...`. Sustituye esos placeholders por archivos reales dentro de carpetas como:

- `assets/hero/`
- `assets/capitulos/`
- `assets/cronicas/`
- `assets/gallery/`

## Docker

Construir la imagen:

```bash
docker build -t artequeer:local .
```

Correr localmente:

```bash
docker run --rm -p 8080:80 artequeer:local
```

Abrir:

```text
http://localhost:8080/capitulos
```

## Railway

El proyecto incluye `railway.json` para usar el `Dockerfile` automaticamente. En Railway basta desplegar el repositorio y exponer el puerto del contenedor.
