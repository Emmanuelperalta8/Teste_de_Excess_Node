const axios = require("axios");

const baseUrl = "http://localhost:3000";
const rotas = ["/", "/excecao", "/demorado"];
const totalRequisicoes = 30;

async function fazerRequisicoes(rota) {
    const inicio = Date.now();
    console.log(`\n🔁 Testando ${totalRequisicoes} requisições para ${baseUrl + rota}`);

    for (let i = 0; i < totalRequisicoes; i++) {
        try {
            const resposta = await axios.get(baseUrl + rota);
            console.log(`✅ ${i + 1}/${totalRequisicoes} - ${resposta.status}`);
        } catch (erro) {
            console.log(`❌ ${i + 1}/${totalRequisicoes} - Erro: ${erro.response?.status || erro.message}`);
        }
    }

    const fim = Date.now();
    const tempoTotal = ((fim - inicio) / 1000).toFixed(2);
    console.log(`⏱️ Tempo total (${rota}): ${tempoTotal} segundos`);
}

(async () => {
    for (const rota of rotas) {
        await fazerRequisicoes(rota);
    }
})();
