// Hamburger menu toggle logic
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));

// Filter functionality logic
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Handle Active Button State
        filterBtns.forEach(button => button.classList.remove("active"));
        btn.classList.add("active");
        
        // Handle Item Display filtering
        const filterValue = btn.getAttribute("data-filter");
        
        galleryItems.forEach(item => {
            if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                item.classList.remove("hide");
            } else {
                item.classList.add("hide");
            }
        });
    });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
