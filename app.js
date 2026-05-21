const routes = {
    "/": renderCapitulos,
    "/capitulos": renderCapitulos,
    "/cronicas": renderCronicas,
    "/gallery": renderGallery
};

const chapters = [
    {
        id: "genesis",
        index: "01",
        title: "Genesis",
        label: "Origen",
        image: "assets/capitulos/genesis.jpg",
        copy: "El cuerpo como primer archivo. Una entrada al arte feminista, la performance y las imagenes que abrieron grietas en la mirada dominante."
    },
    {
        id: "transicion",
        index: "02",
        title: "Transicion",
        label: "Ruptura",
        image: "assets/capitulos/transicion.jpg",
        copy: "Las formas heredadas se fracturan: deseo, genero y presencia publica dejan de ser margen y se convierten en lenguaje visual."
    },
    {
        id: "cronica",
        index: "03",
        title: "Ascension / Cronica",
        label: "Memoria",
        image: "assets/capitulos/ascension.jpg",
        copy: "La historia queer se organiza como constelacion: activismo, teoria, cuerpos y afectos que insisten en ser vistos."
    },
    {
        id: "archivo",
        index: "04",
        title: "Digital Void",
        label: "Archivo",
        image: "assets/capitulos/digital-void.jpg",
        copy: "Fragmentos contemporaneos, redes, archivos digitales y obra viva para imaginar otros modos de exhibir lo queer."
    }
];

const chronicles = [
    {
        year: "1964",
        tag: "Performance",
        title: "Yoko Ono presenta Cut Piece",
        text: "La audiencia corta su ropa durante la accion. El cuerpo queda expuesto como campo politico y como critica al consumo de la imagen femenina.",
        details: "Funciona como antecedente para practicas posteriores que politizan cuerpo, consentimiento, mirada y vulnerabilidad."
    },
    {
        year: "1969",
        tag: "Activismo LGBT",
        title: "Stonewall cambia la militancia publica",
        text: "La revuelta en Nueva York marca un punto de inflexion frente a la represion policial y activa nuevas formas de visibilidad politica.",
        details: "Desde entonces, junio queda asociado a memoria, orgullo, duelo y celebracion; tambien impacta las representaciones artisticas de la disidencia sexual."
    },
    {
        year: "1975",
        tag: "Arte feminista",
        title: "Carolee Schneemann realiza Interior Scroll",
        text: "La obra desafia el sexismo en el arte y propone el cuerpo como espacio de escritura, no como objeto pasivo.",
        details: "Este gesto abre preguntas que mas tarde dialogan con arte queer: quien mira, quien narra y quien decide que cuerpos merecen archivo."
    },
    {
        year: "2016",
        tag: "Mexico",
        title: "Felix d'Eon resignifica la loteria gay mexicana",
        text: "El imaginario popular mexicano se reinterpreta con humor, orgullo y critica visual para afirmar la diversidad sexual dentro de la cultura.",
        details: "La pieza conecta archivo popular, erotica, memoria nacional y una visualidad queer accesible, celebratoria y profundamente local."
    }
];

const galleryItems = [
    ["01", "Retrato disidente", "Pintura", "assets/gallery/retrato-disidente.jpg", 360],
    ["02", "Archivo del deseo", "Collage", "assets/gallery/archivo-deseo.jpg", 520],
    ["03", "Cuerpo electrico", "Performance", "assets/gallery/cuerpo-electrico.jpg", 430],
    ["04", "Loteria nocturna", "Grafica", "assets/gallery/loteria-nocturna.jpg", 300],
    ["05", "Casa elegida", "Fotografia", "assets/gallery/casa-elegida.jpg", 470],
    ["06", "Vestuario ritual", "Textil", "assets/gallery/vestuario-ritual.jpg", 340],
    ["07", "Manifiesto rosa", "Poster", "assets/gallery/manifiesto-rosa.jpg", 410],
    ["08", "Frontera brillante", "Instalacion", "assets/gallery/frontera-brillante.jpg", 560],
    ["09", "Mapa afectivo", "Dibujo", "assets/gallery/mapa-afectivo.jpg", 380],
    ["10", "Noche de archivo", "Video still", "assets/gallery/noche-archivo.jpg", 450]
];

const app = document.querySelector("#app");
const navLinks = document.querySelector("[data-nav-links]");
const menuButton = document.querySelector("[data-menu-button]");

function imageSlot(path, label = "imagen") {
    return `<div class="image-slot" role="img" aria-label="Placeholder de ${label}">
        <span>Ruta de imagen: ${path}</span>
    </div>`;
}

function renderCapitulos() {
    return `
        <section class="route route-capitulos" aria-labelledby="capitulos-title">
            <nav class="side-index" aria-label="Indice de capitulos">
                <p class="side-index__title">INDEX</p>
                <span class="side-index__label">TIMELINE</span>
                ${chapters.map((chapter) => `<a href="#${chapter.id}" data-label="${chapter.label}" aria-label="${chapter.title}"></a>`).join("")}
            </nav>

            <section class="hero-section" id="genesis">
                ${imageSlot("assets/hero/capitulos-genesis.jpg", "hero capitulos")}
                <div class="hero-content">
                    <p class="route-kicker">Historia visual y disidencia</p>
                    <h1 class="hero-title" id="capitulos-title">Capitulos</h1>
                    <p class="hero-lead">Una landing inmersiva para recorrer cuerpos, archivos y rupturas del arte queer.</p>
                </div>
                <span class="scroll-cue" aria-hidden="true"></span>
            </section>

            ${chapters.slice(1, 4).map((chapter, index) => `
                <section class="cinema-section ${index % 2 === 0 ? "" : "cinema-section--right"}" id="${chapter.id}">
                    ${imageSlot(chapter.image, chapter.title)}
                    <article class="glass-panel iridescent-border">
                        <p class="panel-kicker">${chapter.index} / ${chapter.label}</p>
                        <h2 class="panel-title">${chapter.title}</h2>
                        <p class="panel-copy">${chapter.copy}</p>
                    </article>
                </section>
            `).join("")}

            <section class="chapter-grid-section" id="archivo">
                <div class="section-head">
                    <h2 class="panel-title">Digital Void</h2>
                    <p class="panel-kicker">Fragmentos activos</p>
                </div>
                <div class="chapter-grid">
                    ${chapters.map((chapter) => `
                        <article class="chapter-card iridescent-border">
                            ${imageSlot(chapter.image, chapter.title)}
                            <div class="chapter-card__overlay">
                                <span class="chapter-index">${chapter.index}</span>
                                <h3>${chapter.title}</h3>
                                <p>${chapter.copy}</p>
                            </div>
                        </article>
                    `).join("")}
                </div>
            </section>
        </section>
    `;
}

function renderCronicas() {
    return `
        <section class="route chronicles-route" aria-labelledby="cronicas-title">
            <header class="route-header">
                <p class="route-kicker">Cronologia sensible</p>
                <h1 class="route-title" id="cronicas-title">Cronicas del arte queer</h1>
                <p class="route-lead">Una lectura narrativa de obras, gestos y momentos que conectan feminismo, activismo LGBT, teoria queer y cultura visual latinoamericana.</p>
            </header>

            <div class="chronicle-layout">
                <aside class="chronicle-feature iridescent-border" aria-label="Imagen destacada">
                    ${imageSlot("assets/cronicas/cronica-destacada.jpg", "cronica destacada")}
                    <div class="chronicle-feature__text">
                        <p class="panel-kicker">Archivo vivo</p>
                        <h2>La memoria tambien performa.</h2>
                    </div>
                </aside>

                <div class="chronicle-list">
                    ${chronicles.map((item, index) => `
                        <article class="chronicle-card ${index === 0 ? "is-open" : ""}">
                            <span class="card-kicker">${item.year} / ${item.tag}</span>
                            <h3>${item.title}</h3>
                            <p>${item.text}</p>
                            <button type="button" aria-expanded="${index === 0 ? "true" : "false"}">
                                ${index === 0 ? "Ocultar contexto" : "Ver contexto"}
                            </button>
                            <div class="chronicle-card__details">
                                <div>
                                    <p>${item.details}</p>
                                </div>
                            </div>
                        </article>
                    `).join("")}
                </div>
            </div>
        </section>
    `;
}

function renderGallery() {
    return `
        <section class="route gallery-route" aria-labelledby="gallery-title">
            <header class="gallery-intro">
                <div>
                    <p class="route-kicker">Pinterest visual queer</p>
                    <h1 class="route-title" id="gallery-title">Gallery</h1>
                </div>
                <p>Un muro tipo Pinterest para reunir obras queer, referencias, capturas de exposiciones y piezas por sustituir con imagenes finales.</p>
            </header>

            <div class="gallery-board">
                ${galleryItems.map(([index, title, type, image, height]) => `
                    <article class="gallery-card iridescent-border" style="--gallery-height: ${height}px">
                        ${imageSlot(image, title)}
                        <div class="gallery-card__body">
                            <span class="gallery-card__meta">${index} / ${type}</span>
                            <h2>${title}</h2>
                            <p>Placeholder curatorial listo para conectar con obra, ficha tecnica y credito.</p>
                        </div>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
}

function normalizePath(pathname) {
    const cleanPath = pathname.replace(/\/+$/, "") || "/";
    return routes[cleanPath] ? cleanPath : "/capitulos";
}

function renderRoute(pathname = window.location.pathname) {
    const route = normalizePath(pathname);

    if (route !== pathname.replace(/\/+$/, "") && window.location.protocol !== "file:") {
        history.replaceState({}, "", route);
    }

    app.innerHTML = routes[route]();
    app.focus({ preventScroll: true });
    updateActiveNav(route);
    closeMobileMenu();
    bindRouteInteractions(route);
    window.scrollTo({ top: 0, behavior: "auto" });
}

function updateActiveNav(route) {
    document.querySelectorAll("[data-route]").forEach((link) => {
        const href = new URL(link.getAttribute("href"), window.location.origin).pathname;
        link.classList.toggle("is-active", href === route || (route === "/" && href === "/capitulos"));
    });
}

function closeMobileMenu() {
    navLinks.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
}

function bindRouteInteractions(route) {
    if (route === "/cronicas") {
        document.querySelectorAll(".chronicle-card button").forEach((button) => {
            button.addEventListener("click", () => {
                const card = button.closest(".chronicle-card");
                const isOpen = card.classList.toggle("is-open");
                button.setAttribute("aria-expanded", String(isOpen));
                button.textContent = isOpen ? "Ocultar contexto" : "Ver contexto";
            });
        });
    }

    if (route === "/capitulos") {
        const indexLinks = [...document.querySelectorAll(".side-index a")];
        const sections = indexLinks
            .map((link) => document.querySelector(link.getAttribute("href")))
            .filter(Boolean);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                indexLinks.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        }, { threshold: 0.52 });

        sections.forEach((section) => observer.observe(section));
    }
}

document.addEventListener("click", (event) => {
    const routeLink = event.target.closest("[data-route]");
    if (!routeLink) return;

    const url = new URL(routeLink.getAttribute("href"), window.location.origin);
    const route = normalizePath(url.pathname);

    if (window.location.protocol === "file:") return;

    event.preventDefault();
    history.pushState({}, "", route);
    renderRoute(route);
});

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
});

window.addEventListener("popstate", () => renderRoute(window.location.pathname));
document.addEventListener("DOMContentLoaded", () => renderRoute());
