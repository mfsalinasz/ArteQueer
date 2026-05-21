/* =========================================================
   DynamicTimeline
========================================================= */
class DynamicTimeline {
    constructor(selector) {
        this.root = typeof selector === "string" ? document.querySelector(selector) : selector;

        if (!this.root) return;

        this.items = [...this.root.querySelectorAll(".timeline-item")];
        this.navList = this.root.querySelector(".timeline__nav-list");
        this.progressTargets = [
            this.root.querySelector(".timeline__track-progress"),
            this.root.querySelector(".timeline__nav-progress-fill")
        ];
        this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        this.currentMode = "";
        this.observer = null;
        this.activeId = null;

        this.onScroll = this.rafThrottle(() => {
            this.updateScrollProgress();
            this.updateActiveNav();
        });

        this.onResize = this.rafThrottle(() => {
            this.syncMode();
            this.refreshOpenPanels();
            this.updateScrollProgress();
            this.updateActiveNav();
        });

        this.init();
    }

    init() {
        this.syncMode();
        this.buildNav();
        this.setupObserver();
        this.setupAccordions();
        this.bindEvents();
        this.updateScrollProgress();
        this.updateActiveNav();
    }

    bindEvents() {
        window.addEventListener("scroll", this.onScroll, { passive: true });
        window.addEventListener("resize", this.onResize, { passive: true });

        this.reducedMotion.addEventListener("change", () => {
            this.setupObserver();
            this.updateScrollProgress();
        });

        this.navList?.addEventListener("click", (event) => {
            const button = event.target.closest(".timeline__nav-button");
            if (!button) return;

            const targetId = button.dataset.target;
            const target = document.getElementById(targetId);

            if (!target) return;

            target.scrollIntoView({
                behavior: this.reducedMotion.matches ? "auto" : "smooth",
                block: "center"
            });
        });
    }

    syncMode() {
        const mode = window.innerWidth <= 768 ? "mobile" : "desktop";

        if (mode !== this.currentMode) {
            this.currentMode = mode;
            this.root.dataset.mode = mode;
        }
    }

    setupObserver() {
        if (this.observer) {
            this.observer.disconnect();
        }

        if (this.reducedMotion.matches) {
            this.items.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        this.items.forEach((item) => item.classList.remove("is-visible"));

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    this.observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -10% 0px"
            }
        );

        this.items.forEach((item) => this.observer.observe(item));
    }

    buildNav() {
        if (!this.navList) return;

        this.navList.innerHTML = "";

        this.items.forEach((item, index) => {
            const title = item.querySelector(".timeline-card__title")?.textContent?.trim() || `Evento ${index + 1}`;
            const date = item.querySelector(".timeline-card__date")?.textContent?.trim() || `${index + 1}`;

            const li = document.createElement("li");
            const button = document.createElement("button");

            button.type = "button";
            button.className = "timeline__nav-button";
            button.dataset.target = item.id;
            button.dataset.label = `${date} · ${title}`;
            button.setAttribute("aria-label", `${date}: ${title}`);

            li.appendChild(button);
            this.navList.appendChild(li);
        });

        this.navButtons = [...this.navList.querySelectorAll(".timeline__nav-button")];
    }

    setupAccordions() {
        this.items.forEach((item) => {
            const card = item.querySelector(".timeline-card");
            const toggle = item.querySelector(".timeline-card__toggle");
            const details = item.querySelector(".timeline-card__details");

            if (!card || !toggle || !details) return;

            toggle.addEventListener("click", (event) => {
                event.stopPropagation();
                this.toggleItem(item);
            });

            card.addEventListener("click", (event) => {
                const interactive = event.target.closest("button, a, input, select, textarea");
                if (interactive) return;
                this.toggleItem(item);
            });

            card.addEventListener("keydown", (event) => {
                const isKeyboardToggle = event.key === "Enter" || event.key === " ";
                const insideDetails = event.target.closest(".timeline-card__details");
                const isNativeButton = event.target.closest(".timeline-card__toggle");

                if (!isKeyboardToggle || insideDetails || isNativeButton) return;

                event.preventDefault();
                this.toggleItem(item);
            });

            details.addEventListener("transitionend", (event) => {
                if (event.propertyName !== "height") return;

                if (item.classList.contains("is-expanded")) {
                    details.style.height = "auto";
                } else {
                    details.hidden = true;
                }
            });
        });
    }

    toggleItem(item) {
        const isOpen = item.classList.contains("is-expanded");

        this.items.forEach((otherItem) => {
            if (otherItem !== item) this.closeItem(otherItem);
        });

        if (isOpen) {
            this.closeItem(item);
        } else {
            this.openItem(item);
        }
    }

    openItem(item) {
        const toggle = item.querySelector(".timeline-card__toggle");
        const details = item.querySelector(".timeline-card__details");
        const inner = item.querySelector(".timeline-card__details-inner");

        if (!toggle || !details || !inner) return;

        item.classList.add("is-expanded");
        toggle.setAttribute("aria-expanded", "true");
        toggle.textContent = toggle.dataset.closeLabel || "Ocultar contexto";

        details.hidden = false;
        details.style.height = "0px";
        details.style.opacity = "0";

        requestAnimationFrame(() => {
            details.style.height = `${inner.scrollHeight}px`;
            details.style.opacity = "1";
        });
    }

    closeItem(item) {
        const toggle = item.querySelector(".timeline-card__toggle");
        const details = item.querySelector(".timeline-card__details");

        if (!toggle || !details || !item.classList.contains("is-expanded")) return;

        item.classList.remove("is-expanded");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = toggle.dataset.openLabel || "Ver contexto";

        if (details.hidden) return;

        if (details.style.height === "auto") {
            details.style.height = `${details.scrollHeight}px`;
        }

        requestAnimationFrame(() => {
            details.style.height = "0px";
            details.style.opacity = "0";
        });
    }

    refreshOpenPanels() {
        this.items.forEach((item) => {
            if (!item.classList.contains("is-expanded")) return;

            const details = item.querySelector(".timeline-card__details");
            const inner = item.querySelector(".timeline-card__details-inner");

            if (!details || !inner) return;

            details.hidden = false;
            details.style.height = `${inner.scrollHeight}px`;

            requestAnimationFrame(() => {
                details.style.height = "auto";
            });
        });
    }

    updateScrollProgress() {
        const rect = this.root.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const start = viewportHeight * 0.2;
        const end = rect.height - viewportHeight * 0.35;
        const raw = (start - rect.top) / Math.max(end, 1);
        const progress = Math.max(0, Math.min(1, raw));

        this.root.style.setProperty("--scroll-progress", progress.toFixed(4));

        this.progressTargets.forEach((node) => {
            if (!node) return;
            if (window.innerWidth <= 768 && node.classList.contains("timeline__nav-progress-fill")) {
                node.style.transform = `scaleX(${progress})`;
            } else {
                node.style.transform = `scaleY(${progress})`;
            }
        });
    }

    updateActiveNav() {
        if (!this.navButtons?.length) return;

        const focusLine = window.innerHeight * 0.38;
        let currentItem = this.items.find((item) => {
            const rect = item.getBoundingClientRect();
            return rect.top <= focusLine && rect.bottom >= focusLine;
        });

        if (!currentItem) {
            currentItem = this.items.reduce((closest, item) => {
                const rect = item.getBoundingClientRect();
                const distance = Math.abs(rect.top - focusLine);

                if (!closest) return item;

                const closestDistance = Math.abs(closest.getBoundingClientRect().top - focusLine);
                return distance < closestDistance ? item : closest;
            }, null);
        }

        if (!currentItem || currentItem.id === this.activeId) return;

        this.activeId = currentItem.id;

        this.navButtons.forEach((button) => {
            const isActive = button.dataset.target === this.activeId;
            button.classList.toggle("is-active", isActive);

            if (isActive) {
                button.setAttribute("aria-current", "true");
            } else {
                button.removeAttribute("aria-current");
            }
        });
    }

    rafThrottle(callback) {
        let ticking = false;

        return (...args) => {
            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {
                callback(...args);
                ticking = false;
            });
        };
    }
}

/* =========================================================
   Bootstrap
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    new DynamicTimeline("#timeline");
});