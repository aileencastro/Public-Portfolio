document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const cards = document.querySelectorAll(".project-card");
    const emptyState = document.querySelector(".empty-state");
    const updates = document.querySelectorAll(".update-card");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // update active tab
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // filter cards
            const category = tab.dataset.category;
            let visibleCount = 0;

            cards.forEach(card => {
                const categories = card.dataset.category.split("; ");
                if (category === "all" || categories.includes(category)) {
                    card.style.display = "block";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            if (emptyState) {
                emptyState.style.display = visibleCount === 0 ? "block" : "none";
            }
        });
    });

    // Auto-open tab from hash (on page load AND hash change)
    function openTabFromHash() {
        const hashValue = window.location.hash.replace("#", "");
        if (hashValue) {
            const tab = document.querySelector(`.tab[data-category="${hashValue}"]`);
            if (tab) tab.click();
        }
    }

    // Run on page load
    openTabFromHash();

    // Run when hash changes (dropdown clicks on same page)
    window.addEventListener("hashchange", openTabFromHash);

    // Updates ticker
    if (updates.length > 0) {
        let current = 0;
        setInterval(() => {
            updates[current].classList.remove("active");
            current = (current + 1) % updates.length;
            updates[current].classList.add("active");
        }, 4000);
    }
});

function openLightbox(src, alt) {
    const lightbox = document.getElementById("lightbox");
    const img = lightbox.querySelector("img");
    img.src = src;
    img.alt = alt;
    lightbox.classList.add("open");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});

function syncSkillHeights() {
    const categories = document.querySelectorAll(".skill-category");
    categories.forEach(cat => cat.style.minHeight = "");

    let maxHeight = 0;
    categories.forEach(cat => {
        const list = cat.querySelector(".skill-list");
        if (list && list.classList.contains("expanded") && cat.offsetHeight > maxHeight) {
            maxHeight = cat.offsetHeight;
        }
    });

    if (maxHeight > 0) {
        categories.forEach(cat => {
            const list = cat.querySelector(".skill-list");
            if (list && list.classList.contains("expanded")) {
                cat.style.minHeight = maxHeight + "px";
            }
        });
    }
}

document.querySelectorAll(".skill-toggle").forEach(button => {
    button.addEventListener("click", () => {
        const list = button.nextElementSibling;
        const isOpen = list.classList.contains("expanded");

        if (isOpen) {
            list.classList.remove("expanded");
            list.classList.add("collapsed");
            button.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
        } else {
            list.classList.remove("collapsed");
            list.classList.add("expanded");
            button.classList.add("open");
            button.setAttribute("aria-expanded", "true");
        }

        setTimeout(syncSkillHeights, 450);
    });
});

// Language toggle
function toggleLang() {
    const current = localStorage.getItem("lang") || "en";
    const newLang = current === "en" ? "es" : "en";
    setLang(newLang);
}

function setLang(lang) {
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-en][data-es]").forEach(el => {
        el.innerHTML = el.getAttribute("data-" + lang);
    });

    const btn = document.querySelector(".lang-toggle");
    if (btn) btn.textContent = lang === "en" ? "ES" : "EN";
}

// Apply saved language on page load
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("lang") || "en";
    setLang(saved);
});