// Melhorias no script para navegação responsiva
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector(".navbar");
    const menuButton = document.querySelector(".menu-button");
    const navItems = document.querySelectorAll("nav ul li");
    
    // Toggle menu ao clicar no botão
    menuButton.addEventListener("click", () => {
        navbar.classList.toggle("show-menu");
    });
    
    // Fechar menu ao clicar em um item de navegação (melhor experiência mobile)
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navbar.classList.remove("show-menu");
        });
    });
    
    // Detectar scroll para adicionar sombra ao navbar
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });
    
    // Adicionar funcionalidade de "lazy loading" para imagens (melhora performance)
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        img.setAttribute("loading", "lazy");
    });
});