gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const blueBox = document.querySelector("#caja_azul");
const whiteBox = document.querySelector("#caja_blanca");
const heroText = document.querySelector("#caja_texto");
const sobreMi = document.querySelector("#seccion_sobre_mi"); 
const header = document.querySelector("header"); 

// Navegación fluida hacia la sección "Sobre mí"
const btnSobreMi = document.querySelector("#btn-sobre-mi");
btnSobreMi.addEventListener("click", (e) => {
    e.preventDefault(); 
    gsap.to(window, {
        scrollTo: tl.scrollTrigger.end, 
        duration: 1.2, 
        ease: "power3.inOut" 
    });
});

// Cálculos dinámicos para el escalado responsivo
function calculateScale() {
    const scaleX = (window.innerWidth / whiteBox.offsetWidth) * 1.15;
    const scaleY = (window.innerHeight / whiteBox.offsetHeight) * 1.15;
    return Math.max(scaleX, scaleY);
}

function getOrigin() {
    const originY = whiteBox.offsetTop + (whiteBox.offsetHeight / 2);
    return `50% ${originY}px`;
}

function getYTranslation() {
    const blueCenter = blueBox.offsetHeight / 2;
    const whiteCenter = whiteBox.offsetTop + (whiteBox.offsetHeight / 2);
    return (blueCenter - whiteCenter) - 8; 
}

// Configuración del Timeline principal
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#pin-container", 
        start: "top top",   
        end: "+=4000",      
        scrub: 1,           
        pin: true,
        invalidateOnRefresh: true
    }
});

// Fase 1: Escalado de la ventana y ocultación del Hero
tl.to(blueBox, {
    scale: calculateScale, 
    y: getYTranslation,        
    transformOrigin: getOrigin, 
    pointerEvents: "none", // IMPORTANTE: Evita bloqueo de clics en móviles
    ease: "power1.inOut" 
}, 0); 

tl.to(heroText, {
    autoAlpha: 0, 
    scale: 0.8, 
    ease: "power1.inOut"
}, 0); 

tl.to(header, {
    autoAlpha: 0, 
    y: -20,       
    ease: "power1.inOut",
    duration: 0.3
}, 0);

// Fase 2: Aparición de contenido secundario y reaparición del Header
tl.to(sobreMi, {
    autoAlpha: 1, 
    ease: "power2.out"
}, "+=0.1");

tl.to(header, {
    autoAlpha: 1, 
    y: 0,         
    ease: "power2.out",
    duration: 0.3
}, "<");