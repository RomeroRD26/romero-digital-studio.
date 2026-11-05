const config = window.RDS_CONFIG || {};
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

const waLink = document.getElementById("directWhatsapp");
const number = (config.whatsappNumber || "").replace(/\D/g, "");
if (number) {
  waLink.href = `https://wa.me/${number}?text=${encodeURIComponent("Hola, quiero información sobre los servicios de Romero Digital Studio.")}`;
} else {
  waLink.href = "#contacto";
  waLink.addEventListener("click", event => {
    event.preventDefault();
    alert("Falta configurar el número de WhatsApp. Abre config.js y escribe tu número internacional.");
  });
}

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = `Solicitud de servicio - ${data.get("service")}`;
  const body = [
    `Nombre: ${data.get("name")}`,
    `Correo: ${data.get("email")}`,
    `Servicio: ${data.get("service")}`,
    "",
    "Detalles:",
    data.get("message")
  ].join("\n");

  if (number) {
    const message = `Hola, soy ${data.get("name")}.\nCorreo: ${data.get("email")}\nServicio: ${data.get("service")}\nDetalles: ${data.get("message")}`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    document.getElementById("formHint").textContent = "Se abrió WhatsApp con tu solicitud preparada. Revísala y pulsa Enviar.";
  } else if (config.contactEmail && config.contactEmail.includes("@")) {
    window.location.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.getElementById("formHint").textContent = "Se abrió tu aplicación de correo con la solicitud preparada.";
  } else {
    document.getElementById("formHint").textContent = "Para recibir solicitudes, configura tu WhatsApp o correo en config.js antes de publicar.";
  }
});
