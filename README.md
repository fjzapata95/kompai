# Kompai · Landing

Página de presentación de **Kompai**, la plataforma para pequeños negocios en Colombia.
Tus clientes escriben, Kompai hace el resto.

La página está en modo **lista de espera para negocios piloto**: invita a los interesados a dejar sus datos y los envía por WhatsApp.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura y textos de la página |
| `styles.css` | Diseño (colores, tipografía, adaptación a celular) |
| `app.js` | Sectores interactivos, menú móvil y formulario a WhatsApp |
| `favicon.svg`, `apple-touch-icon.png` | Íconos de la pestaña y del celular |
| `brand/` | Identidad: logo, símbolo, versiones en blanco, avatar para WhatsApp e imagen para compartir (SVG y PNG) |

## Antes de publicar

En `app.js`, escribe el número de WhatsApp que recibirá a los interesados, con código de país y sin espacios:

```js
const WHATSAPP_NUMBER = '573001234567';
```

Mientras esté vacío, el formulario muestra un aviso en lugar de abrir WhatsApp.

## Ver la página en tu computador

Abre `index.html` con doble clic en el navegador. No necesita instalar nada.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `kompai`).
2. Sube estos archivos a la rama `main`:
   ```bash
   git init
   git add .
   git commit -m "Landing de Kompai"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/kompai.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
4. En uno o dos minutos la página queda en `https://TU_USUARIO.github.io/kompai/`.

### Dominio propio (opcional)

Si compras `kompai.app`, `kompai.co` u otro dominio, configúralo en **Settings → Pages → Custom domain** y sigue las instrucciones de DNS de GitHub.

## Identidad de marca

- **Colores:** Verde Kompai `#0F766E`, Verde profundo `#134E4A`, Turquesa Caribe `#14B8A6`, Ámbar sol `#F59E0B`, Tinta `#0F172A`, Menta clara `#F0FDFA`.
- **Tipografía:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (licencia OFL).
- **Avatar para WhatsApp e Instagram:** `brand/kompai-avatar-whatsapp.png`.
