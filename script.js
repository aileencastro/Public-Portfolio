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

            emptyState.style.display = visibleCount === 0 ? "block" : "none";
        });
    });

    if (updates.length === 0) return;

    let current = 0;

    setInterval(() => {
        updates[current].classList.remove("active");
        current = (current + 1) % updates.length;
        updates[current].classList.add("active");
    }, 4000);
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