const WHATSAPP_URL = "https://wa.me/5531999547699";
const form = document.querySelector("#commercial-form");
const success = document.querySelector("#form-success");
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

function trackConversion(name) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name });
}

document.querySelectorAll(".js-track").forEach((element) => {
  element.addEventListener("click", () => {
    const eventName = element.getAttribute("data-event") || "interaction";
    trackConversion(eventName);
  });
});

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("is-open", !expanded);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    });
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get("website")) return;

    const message = [
      "Olá! Conheci a proposta comercial do LEGADO RUN e gostaria de conversar sobre as oportunidades de patrocínio.",
      "",
      `Nome: ${data.get("nome") || ""}`,
      `Empresa: ${data.get("empresa") || ""}`,
      `Cargo: ${data.get("cargo") || ""}`,
      `Telefone: ${data.get("telefone") || ""}`,
      `E-mail: ${data.get("email") || ""}`,
      `Segmento: ${data.get("segmento") || ""}`,
      `Cota de interesse: ${data.get("cota") || ""}`,
      `Mensagem: ${data.get("mensagem") || ""}`,
      `Consentimento: ${data.get("consentimento") ? "Sim" : "Não"}`,
    ].join("\n");

    trackConversion("form_submit_whatsapp");
    if (success) success.classList.add("is-visible");
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

document.querySelectorAll(".image-open").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.getAttribute("data-image") || "";
    lightboxImage.alt = button.getAttribute("data-alt") || "";
    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    }
  });
});

lightboxClose?.addEventListener("click", () => lightbox?.close());
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
