# lccarelli.github.io

Sitio personal de Laura Carelli — Senior Software Engineer · Tech Lead · Consultant.

Estático, sin frameworks: `index.html` + `styles.css` + `script.js`. Bilingüe ES/EN.

## Ver en local

Abrí `index.html` en el navegador, o levantá un server simple:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

## Editar contenido

- **Textos:** están en `index.html`. Cada texto traducible tiene `data-es` y `data-en`.
  Para cambiar una frase, editá **los dos** atributos (y el texto visible si lo querés en ES).
- **Tarifas:** sección `#rates` en `index.html`.
- **Colores / tipografías:** variables `:root` arriba de `styles.css`.
- **Idioma por defecto:** se detecta del navegador; el toggle recuerda la elección.

## Deploy en GitHub Pages

1. Crear el repo **`lccarelli.github.io`** en GitHub (nombre exacto = usuario + `.github.io`).
2. Push de esta carpeta a `main`.
3. Settings → Pages → Source: `main` / root.
4. Queda en `https://lccarelli.github.io`.

> the owls are not what they seem 🛸
