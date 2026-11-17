/* =========================================================================
   KOMPAI · LANDING
   ========================================================================= */

/**
 * CONFIGURACIÓN: NÚMERO DE WHATSAPP QUE RECIBE LOS INTERESADOS.
 * Código de país + número, sin espacios ni símbolos. Ejemplo: '573001234567'.
 * Mientras esté vacío, el formulario muestra un aviso en lugar de abrir WhatsApp.
 */
const WHATSAPP_NUMBER = '';

/**
 * SECTORES: CÓMO SE ADAPTA KOMPAI A CADA TIPO DE NEGOCIO.
 */
const SECTORS = [
    {
        id: 'comidas', icon: '🍔', name: 'Comidas y bebidas',
        writes: '"Hola, ¿qué tienen hoy?"',
        link: 'Ve el menú, elige adicionales ("sin cebolla", "extra queso"), domicilio o recoger, y paga.',
        reminder: '"¡Viernes de promo! 2x1 en hamburguesas hasta las 9 p. m. 🍔"',
    },
    {
        id: 'lavadero', icon: '🚗', name: 'Lavadero',
        writes: '"¿Tienen turno para lavar el carro hoy?"',
        link: 'Escoge el tipo de lavado, registra la placa y reserva su turno o el lavado a domicilio.',
        reminder: '"Hace 15 días no lavas tu carro. Hoy tienes 10% de descuento ✨"',
    },
    {
        id: 'veterinaria', icon: '🐾', name: 'Veterinaria',
        writes: '"Quiero una cita para vacunar a Luna"',
        link: 'Elige el servicio, el veterinario y la hora. Los datos de la mascota quedan guardados.',
        reminder: '"A Luna le corresponde su vacuna esta semana. ¿Agendamos? 💉"',
    },
    {
        id: 'peluqueria', icon: '💇', name: 'Peluquería',
        writes: '"¿Me puedes atender el sábado en la mañana?"',
        link: 'Reserva con su estilista favorito en el horario disponible, sin esperar respuesta.',
        reminder: '"Ya va un mes desde tu último corte. ¿Te guardamos un turno? ✂️"',
    },
    {
        id: 'mascotas', icon: '🐶', name: 'Baño y paseo de perros',
        writes: '"Quiero bañar a mi perro el sábado"',
        link: 'Agenda baño o paseo, incluso fijo (lunes, miércoles y viernes), y usa su paquete prepagado.',
        reminder: '"Te queda 1 baño de tu paquete. Renuévalo con descuento 🛁"',
    },
    {
        id: 'tecnicos', icon: '🛠️', name: 'Servicios a domicilio',
        writes: '"Necesito que revisen el aire acondicionado"',
        link: 'Solicita la visita con su dirección. El técnico llega, toma fotos y el cliente firma al terminar.',
        reminder: '"Tu mantenimiento preventivo está próximo. ¿Lo programamos? 🔧"',
    },
    {
        id: 'ropa', icon: '👗', name: 'Ropa y accesorios',
        writes: '"¿Tienen el vestido azul en talla M?"',
        link: 'Elige talla y color según existencias, y compra o aparta con un abono.',
        reminder: '"Llegó la nueva colección en tu talla 🛍️"',
    },
    {
        id: 'joyeria', icon: '💍', name: 'Joyería',
        writes: '"Quiero apartar la cadena que vi en Instagram"',
        link: 'Ve la pieza, la aparta con abonos y consulta cuánto le falta.',
        reminder: '"Tu apartado va en 80%. Complétalo y llévatelo ✨"',
    },
    {
        id: 'celulares', icon: '📱', name: 'Celulares',
        writes: '"¿Cómo va la reparación de mi celular?"',
        link: 'Consulta el estado de su reparación o compra equipos y accesorios con garantía.',
        reminder: '"Tu equipo ya está reparado. Puedes recogerlo hoy ✅"',
    },
    {
        id: 'farmacia', icon: '💊', name: 'Farmacia',
        writes: '"¿Me pueden enviar lo de la fórmula?"',
        link: 'Envía la foto de la fórmula o pide sus productos frecuentes a domicilio.',
        reminder: '"¿Te enviamos tu pedido de cada mes? 💊"',
    },
];

// SECTORES: BOTONES Y PANEL.
const sectorsEl = document.querySelector('.sectors');
const panelEl = document.getElementById('sector-panel');

function renderSector(sector) {
    panelEl.innerHTML = `
        <div class="sector-panel__item sector-panel__item--quote"><small>Tu cliente escribe</small><p>${sector.writes}</p></div>
        <div class="sector-panel__item"><small>El enlace le permite</small><p>${sector.link}</p></div>
        <div class="sector-panel__item sector-panel__item--quote"><small>Y después le recuerdas</small><p>${sector.reminder}</p></div>`;
    sectorsEl.querySelectorAll('.sector-btn').forEach(btn => {
        btn.setAttribute('aria-selected', String(btn.dataset.id === sector.id));
        btn.tabIndex = btn.dataset.id === sector.id ? 0 : -1;
    });
}

SECTORS.forEach(sector => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sector-btn';
    btn.role = 'tab';
    btn.dataset.id = sector.id;
    btn.setAttribute('aria-controls', 'sector-panel');
    btn.innerHTML = `<span aria-hidden="true">${sector.icon}</span>${sector.name}`;
    btn.addEventListener('click', () => renderSector(sector));
    sectorsEl.appendChild(btn);
});

// NAVEGACIÓN CON FLECHAS ENTRE SECTORES.
sectorsEl.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    const buttons = [...sectorsEl.querySelectorAll('.sector-btn')];
    const index = buttons.indexOf(document.activeElement);
    const next = buttons[(index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length];
    next.focus();
    next.click();
});

renderSector(SECTORS[0]);

// MENÚ MÓVIL.
const toggle = document.querySelector('.nav__toggle');
const mobileMenu = document.getElementById('mobile-menu');
toggle.addEventListener('click', () => {
    const open = mobileMenu.hidden;
    mobileMenu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
}));

// WHATSAPP: BOTÓN FLOTANTE Y FORMULARIO.
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

if (WHATSAPP_NUMBER) {
    const floatBtn = document.getElementById('wa-float');
    floatBtn.href = waLink('Hola, quiero saber más sobre Kompai 👋');
    floatBtn.target = '_blank';
    floatBtn.rel = 'noopener';
}

// FORMULARIO DE PILOTOS CON PROTECCIÓN CONTRA ENVÍOS AUTOMÁTICOS (SIN CAPTCHA):
// CAMPO TRAMPA, TIEMPO MÍNIMO DE LLENADO, VALIDACIÓN DEL CONTENIDO Y ESPERA ENTRE ENVÍOS.
const form = document.getElementById('lead-form');
const formError = document.getElementById('form-error');
const LOADED_AT = Date.now();
const MIN_FILL_MS = 3000;          // UNA PERSONA TARDA MÁS DE 3 SEGUNDOS EN LLENARLO.
const COOLDOWN_MS = 60 * 1000;     // UN ENVÍO POR MINUTO.
const COOLDOWN_KEY = 'kompai_lead_sent_at';
const LINK_PATTERN = /(https?:\/\/|www\.|\.(com|net|org|ru|xyz|info|top|io)\b|<[^>]+>)/i;
const HAS_LETTERS = /\p{L}{2,}/u;

const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

function showMessage(text, ok = false) {
    formError.textContent = text;
    formError.classList.toggle('cta__error--ok', ok);
    formError.hidden = false;
}

function lastSentAt() {
    try { return Number(localStorage.getItem(COOLDOWN_KEY)) || 0; } catch { return 0; }
}

function markSent() {
    try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch { /* SIN ALMACENAMIENTO: SE OMITE LA ESPERA */ }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nombre = clean(data.get('nombre'));
    const negocio = clean(data.get('negocio'));
    const ciudad = clean(data.get('ciudad'));
    const tipo = clean(data.get('tipo'));

    // BOTS: CAMPO TRAMPA LLENO O ENVÍO DEMASIADO RÁPIDO. SE RESPONDE COMO SI FUERA EXITOSO PARA NO DARLES PISTAS.
    if (clean(data.get('sitio_web')) || Date.now() - LOADED_AT < MIN_FILL_MS) {
        form.reset();
        showMessage('¡Gracias! Te contactaremos pronto.', true);
        return;
    }

    if (!nombre || !negocio || !tipo || !data.get('consent')) {
        showMessage('Completa tu nombre, el negocio, el tipo y la autorización de datos.');
        return;
    }
    if (!HAS_LETTERS.test(nombre) || !HAS_LETTERS.test(negocio)) {
        showMessage('Revisa tu nombre y el nombre del negocio.');
        return;
    }
    if ([nombre, negocio, ciudad].some(value => LINK_PATTERN.test(value))) {
        showMessage('Por favor no incluyas enlaces ni direcciones web.');
        return;
    }

    const wait = COOLDOWN_MS - (Date.now() - lastSentAt());
    if (wait > 0) {
        showMessage(`Ya recibimos tus datos. Si necesitas enviarlos de nuevo, espera ${Math.ceil(wait / 1000)} segundos.`);
        return;
    }

    if (!WHATSAPP_NUMBER) {
        showMessage('Muy pronto podrás escribirnos por aquí. ¡Gracias por tu interés!', true);
        return;
    }

    formError.hidden = true;
    const text = [
        'Hola, quiero ser negocio piloto de Kompai 👋',
        `Nombre: ${nombre}`,
        `Negocio: ${negocio}`,
        `Tipo: ${tipo}`,
        ciudad ? `Ciudad: ${ciudad}` : null,
    ].filter(Boolean).join('\n');
    markSent();
    window.open(waLink(text), '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
