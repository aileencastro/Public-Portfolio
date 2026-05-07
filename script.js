document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const cards = document.querySelectorAll(".project-card");
    const emptyState = document.querySelector(".empty-state");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // update active tab
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // filter cards
            const category = tab.dataset.category;
            let visibleCount = 0;

            cards.forEach(card => {
                if (category === "all" || card.dataset.category === category) {
                    card.style.display = "block";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            emptyState.style.display = visibleCount === 0 ? "block" : "none";
        });
    });
});

function openLightbox() {
    document.getElementById("lightbox").classList.add("open");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});