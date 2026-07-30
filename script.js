const form = document.querySelector("#commercial-form");
const success = document.querySelector("#form-success");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      "Olá, conheci as oportunidades de parceria do LEGADO RUN e gostaria de receber mais informações sobre as cotas disponíveis para minha empresa.",
      "",
      `Nome: ${data.get("nome") || ""}`,
      `Empresa: ${data.get("empresa") || ""}`,
      `Cargo: ${data.get("cargo") || ""}`,
      `Telefone: ${data.get("telefone") || ""}`,
      `E-mail: ${data.get("email") || ""}`,
      `Segmento: ${data.get("segmento") || ""}`,
      `Cota de interesse: ${data.get("cota") || ""}`,
      `Faixa de investimento: ${data.get("investimento") || ""}`,
      `Mensagem: ${data.get("mensagem") || ""}`,
    ].join("\n");

    if (success) success.classList.add("is-visible");
    window.open(`https://wa.me/message/5JKQOATHVNQGC1?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}
