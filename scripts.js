document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("modules-form");
    const totalSpan = document.getElementById("total");
    const whatsappLink = document.getElementById("whatsapp-link");
    const pdvPontoAdicionalCheckbox = document.getElementById("pdv-ponto-adicional-checkbox");
    const pdvPontoAdicionalQuantity = document.getElementById("pdv-ponto-adicional-quantity");
    const accordionButtons = document.querySelectorAll(".accordion-button");

    // Alterna entre mostrar e esconder o conteúdo do acordeão
    accordionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;

            // Fecha outros acordeões ao abrir um
            document.querySelectorAll(".accordion-content").forEach((item) => {
                if (item !== content) {
                    item.classList.remove("active");
                }
            });

            // Alterna o estado do acordeão atual
            content.classList.toggle("active");
        });
    });

    // Habilita ou desabilita o campo de quantidade ao marcar o checkbox
    pdvPontoAdicionalCheckbox.addEventListener("change", () => {
        pdvPontoAdicionalQuantity.disabled = !pdvPontoAdicionalCheckbox.checked;
        updateTotal(); // Atualiza o total ao habilitar/desabilitar
    });

    // Atualiza o total ao alterar o formulário
    form.addEventListener("input", updateTotal);

    function updateTotal() {
        let total = 0;
        let selectedItems = [];

        // Calcula os módulos selecionados
        const selectedModules = form.querySelectorAll("input[type='checkbox']:checked");
        selectedModules.forEach((module) => {
            const price = parseFloat(module.dataset.price || module.value || 0);

            // Trata o caso específico do PDV Ponto Adicional
            if (module.id === "pdv-ponto-adicional-checkbox") {
                const quantity = parseInt(pdvPontoAdicionalQuantity.value, 10) || 1;
                total += price * quantity;
                selectedItems.push(`PDV Legal Ponto Adicional (${quantity} unidades)`);
            } else {
                total += price;
                selectedItems.push(module.dataset.label);
            }
        });

        // Atualiza o total no HTML
        totalSpan.textContent = total.toFixed(2).replace(".", ",");

        // Gera a mensagem para o WhatsApp
        const message = `Olá! Gostaria de solicitar o Pdv Legal com os seguintes módulos e planos:
- ${selectedItems.join("\n- ")}
Total: R$ ${total.toFixed(2).replace(".", ",")}`;

        whatsappLink.href = `http://wa.me/5522988263423?text=${encodeURIComponent(message)}`;
    }
});
